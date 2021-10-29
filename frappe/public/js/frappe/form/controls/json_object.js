frappe.ui.form.ControlJSONObject = class ControlJSONObject extends frappe.ui.form.ControlCode {
	set_language() {
		this.editor.session.setMode('ace/mode/json');
		this.editor.setKeyboardHandler('ace/keyboard/vscode');
	}

	// set_value(value) {
	// 	try {
	// 		value = JSON.parse(value);
	// 		return super.set_value(value);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// }

	// validate(value) {
	// 	try {
	// 		return JSON.parse(value);
	// 	} catch (e) {
	// 		this.df.invalid = true;
	// 		throw e;
	// 	}
	// }

	parse(value) {
		if (value == "") {
			return "";
		}
		return JSON.parse(value);
	}

	set_formatted_input(value) {
		value = JSON.stringify(value, null, 2);
		return this.load_lib().then(() => {
			if (!this.editor) return;
			if (!value) value = '';
			if (value === this.get_input_value()) return;
			this.editor.session.setValue(value);
		});
	}
};
