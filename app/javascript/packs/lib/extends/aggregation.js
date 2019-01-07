import define from 'mixinable';

/**
 * @param base
 * @param mixins
 * @return {__Aggregate}
 */
export const aggregation = (base, ...mixins) => {

  /**
   * @class __Aggregate
   * @constant aggregate
   * @type {__Aggregate}
   */
  const aggregate = class __Aggregate extends base {
    constructor(...args) {
      // Call base class constructor
      super(...args);

      // Call mixin's initializer
      mixins.forEach(mixin => {
        if (typeof mixin.prototype.initializer === 'function') {
          mixin.prototype.initializer.apply(this, args);
        }
      });
    }
  };

  /**
   * Copy properties
   * @param target
   * @param source
   */
  const copyProps = (target, source) => {
    Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(prop => {
      const matcher = /^(?:initializer|constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/;
      if (prop.match(matcher)) {
        return;
      }
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    });
  };

  // Copy all properties of all mixins into aggregation class
  mixins.forEach(mixin => {
    copyProps(aggregate.prototype, mixin.prototype);
    copyProps(aggregate, mixin);
  });

  return aggregate;
};

/**
 * @exports
 * @param mixins
 * @return {*}
 */
export const mix = (...mixins) => define({}, [...mixins]);