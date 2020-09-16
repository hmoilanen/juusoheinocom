import { mount } from '@vue/test-utils'
import baseButton from '@/components/base/_BaseButton.vue'

describe('_BaseButton.vue', () => {
	it('click event is emitted / listened when clicked', () => {
		const onClick = jest.fn()
		const wrapper = mount(baseButton, {
			listeners: {
				click: onClick
			}
		})

		wrapper.find('button')
			.trigger('click')
		expect(onClick).toHaveBeenCalled()
	})
})