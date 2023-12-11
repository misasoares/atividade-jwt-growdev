export class Matricula {
    constructor(private _turmaId: string, private _alunoId: string, private _ativo?: boolean) {}

    public get turmaId() {
        return this._turmaId;
    }
    public get alunoId() {
        return this._alunoId;
    }

    public toJson() {
        return {
            alunoId: this._alunoId,
            turmaId: this._turmaId,
        };
    }
}
