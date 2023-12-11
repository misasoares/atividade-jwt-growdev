import { v4 } from "uuid";

export class Turma {
    private _id: string;

    constructor(private _programa: string, private _edicao: number, private _maxAlunos?: number) {
        this._id = v4();
    }

    public get id() {
        return this._id;
    }

    public toJson() {
        return {
            id: this._id,
            programa: this._programa,
            edicao: this._edicao,
            maxAlunos: this._maxAlunos,
        };
    }
}
