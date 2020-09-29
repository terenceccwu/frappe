import Picker from '../../color_picker/color_picker';

frappe.ui.form.ControlColor = frappe.ui.form.ControlData.extend({
	make_input: function () {
		this._super();
		this.make_color_input();
	},
	make_color_input: function () {
		let picker_wrapper = $('<div>');
		this.picker = new Picker({
			parent: picker_wrapper[0],
			color: this.get_color(),
			swatches: [
				'#449CF0',
				'#ECAD4B',
				'#29CD42',
				'#761ACB',
				'#CB2929',
				'#ED6396',
				'#29CD42',
				'#4463F0',
				'#EC864B',
				'#4F9DD9',
				'#39E4A5',
				'#B4CD29',
			]
		});

		this.$wrapper.popover({
			trigger: 'manual',
			offset: `${-this.$wrapper.width() / 4}, 5`,
			placement: 'bottom',
			template: `
				<div class="popover">
					<div class="picker-arrow arrow"></div>
					<div class="popover-body popover-content"></div>
				</div>
			`,
			content: () => picker_wrapper,
			html: true
		}).on('show.bs.popover', () => {
			setTimeout(() => {
				this.picker.refresh();
			}, 10);
		}).on('hidden.bs.popover', () => {
			$('body').off('click.color-popover');
			$(window).off('hashchange.color-popover');
		});

		this.$wrapper.find('.control-input').on('click', (e) => {
			this.$wrapper.popover('show');
			if (!this.get_color()) {
				this.$input.val('');
			}
			e.stopPropagation();
			$('body').on('click.color-popover', (ev) => {
				if (!$(ev.target).parents().is('.popover')) {
					this.$wrapper.popover('hide');
				}
			});
			$(window).on('hashchange.color-popover', () => {
				this.$wrapper.popover('hide');
			});
		});

		this.picker.on_change = (color) => {
			this.set_value(color);
		};

		if (!this.selected_color) {
			this.selected_color = $(`<div class="selected-color"></div>`);
			this.selected_color.insertAfter(this.$input);
		}
	},
	refresh() {
		this._super();
		let color = this.get_color();
		if (this.picker.color !== color) {
			this.picker.color = color;
			this.picker.refresh();
		}
	},
	set_formatted_input: function(value) {
		this._super(value);

		this.$input.val(value || __('Choose a color'));
		this.selected_color.css({
			"background-color": value || 'transparent',
		});
		this.selected_color.toggleClass('no-value', !value);
	},
	get_color() {
		return this.validate(this.get_value());
	},
	validate: function (value) {
		if (value === '') {
			return '';
		}
		var is_valid = /^#[0-9A-F]{6}$/i.test(value);
		if (is_valid) {
			return value;
		}
		return null;
	}
});
