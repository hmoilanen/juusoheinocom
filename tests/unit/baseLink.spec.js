import { mount } from '@vue/test-utils'
import baseLink from '@/components/base/_base-link.vue'

describe('baseLink.vue', () => {
	it('click event is emitted / listened when clicked', () => {
		const onClick = jest.fn()
		const wrapper = mount(baseLink, {
			listeners: {
				click: onClick
			},
			propsData: {
				mode: 'a'
			}
		})

		wrapper.find('.base-link')
			.trigger('click')
		expect(onClick).toHaveBeenCalled()
	})
})