import { hasPackageJsonField } from "./utils/has-package-json-field.js";

const hasDescriptionField = hasPackageJsonField("description");

export default hasDescriptionField;
