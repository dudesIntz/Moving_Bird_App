import { createRef } from "react";

export const dropdownAlertRef = createRef();

export class DropDownHolder {
  static getDropDown() {
    return dropdownAlertRef.current;
  }
  static alert(type = "info", title = "", content = "") {
    dropdownAlertRef.current?.closeAction();
    dropdownAlertRef.current?.alertWithType(type, title, content);
  }
}
