/* global process, console */

export const SECRET = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

export const getPropType = (prop) => Array.isArray(prop) ? 'array' : typeof prop;

export class PropTypeError extends Error {
  static TypeError(propType, expectedType, componentName, location, propFullName) {
    return new PropTypeError(`Invalid ${location} \`${propFullName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`${expectedType}\`.`);
  }
  static InvalidTypeError(checker, componentName, location, propFullName) {
    return new PropTypeError(`${componentName || 'React class'}: ${location} type \`${propFullName}\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`${getPropType(checker)}\`.`);
  }
  static RequiredError(propValue, componentName, location, propFullName) {
    const type = (propValue === null) ? 'null' : 'undefined';
    return new PropTypeError(`The ${location} \`${propFullName}\` is marked as required in \`${componentName}\`, but its value is \`${type}\`.`);
  }

  constructor(message, data) {
    super(message);
    this.data = (typeof data === 'object') ? data : null;
    this.data = this.data ?? {};
    this.stack = '';
  }
}

export function createChainableTypeChecker(checker) {
  const chainable = (isRequired, props, propName, componentName, location, propFullName) => {
    if( props[propName] == null ) {
      if( isRequired ) {
        return PropTypeError.RequiredError(props[propName], componentName, location, propFullName);
      }
      return null;
    } else {
      return checker(props, propName, componentName, location, propFullName);
    }
  };
  const fn = chainable.bind(null, false);
  fn.isRequired = chainable.bind(null, true);
  return fn;
}

export default {
  tuple: function(tupleTypes) {
    if( !Array.isArray(tupleTypes) ) {
      if( process.env.NODE_ENV !== 'production' ) {
        if( arguments.length > 1 ) {
          console.warn(`Invalid arguments supplied to tuple, expected an array, got ${arguments.length} arguments. A common mistake is to write tuple(x, y, z) instead of tuple([x, y, z]).`);
        } else {
          console.warn('Invalid arguments supplied to tuple, expected an array.');
        }
      }
      return () => null;
    }
    return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
      const propType = getPropType(props[propName]);
      if( propType !== 'array' ) {
        return PropTypeError.TypeError(propType, 'array', componentName, location, propFullName);
      }
      for( const key in tupleTypes ) {
        const checker = tupleTypes[key];
        if( typeof checker !== 'function' ) {
          return PropTypeError.InvalidTypeError(checker, componentName, location, `${propFullName}.${key}`);
        }
        const error = checker(props[propName], key, componentName, location, `${propFullName}.${key}`, SECRET);
        if( error ) {
          return error;
        }
      }
    });
  },
};
