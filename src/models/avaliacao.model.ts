import { v4 } from "uuid";

export class Avaliacao {
    private _id: string;

    constructor(private _disciplina: string, private _nota: number) {
        this._id = v4();
    }

    public get id() {
        return this._id;
    }

    public toJson() {
        return {
            id: this._id,
            nota: this._nota,
            disciplina: this._disciplina,
        };
    }
}
