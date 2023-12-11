export class Projeto {
    public id!: string;

    constructor(
        private _descricao: string,
        private _ferramenta: string,
        private _status: string
    ) {}

    public get status() {
        return this._status;
    }

    public toJson() {
        return {
            id: this.id,
            descricao: this._descricao,
            ferramenta: this._ferramenta,
            status: this._status,
        };
    }
}
