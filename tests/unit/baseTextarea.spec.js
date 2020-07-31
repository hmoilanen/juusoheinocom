import { mount } from '@vue/test-utils'
import baseTextarea from '@/components/base/_base-textarea.vue'

describe('baseTextarea.vue', () => {
	it('two way data binding (value/input) works', () => {
		const text = 'test text'
		const wrapper = mount(baseTextarea, {
			propsData: {
				value: text
			}
		})

		wrapper.find('textarea')
			.trigger('input')
		
		expect(wrapper.emitted('input')[0][0]).toBe(text)
		expect(wrapper.emitted('input').length).toBe(1)
	})

	it('change of value works by typing', () => {
		const text = 'test text'
		const wrapper = mount(baseTextarea)

		wrapper.find('textarea')
			.setValue(text)

		expect(wrapper.emitted('input')[0][0]).toBe(text)
		expect(wrapper.emitted('input').length).toBe(1)
	})
})