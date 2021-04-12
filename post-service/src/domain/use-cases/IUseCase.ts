export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]> | Promise<void>;

}