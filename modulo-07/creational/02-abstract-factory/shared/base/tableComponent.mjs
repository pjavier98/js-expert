import NotImplementationException from "../notImplementedException.mjs";

export default class TableComponent {
    render(data) {
        throw new NotImplementationException(this.render.name);
    }
}