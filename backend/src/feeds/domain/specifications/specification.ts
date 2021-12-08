export abstract class Specification<T> {
    abstract ToExpression(): (type: T) => boolean;
}
