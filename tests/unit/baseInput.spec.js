import { mount } from '@vue/test-utils'
import baseInput from '@/components/base/_BaseInput.vue'

describe('_BaseInput.vue', () => {
	it('two way data binding (value/input) works', () => {
		const text = 'test text'
		const wrapper = mount(baseInput, {
			propsData: {
				value: text
			}
		})

		wrapper.find('input')
			.trigger('input')
		
		expect(wrapper.emitted('input')[0][0]).toBe(text)
		expect(wrapper.emitted('input').length).toBe(1)
	})

	it('change of value works by typing', () => {
		const text = 'test text'
		const wrapper = mount(baseInput)

		wrapper.find('input')
			.setValue(text)

		expect(wrapper.emitted('input')[0][0]).toBe(text)
		expect(wrapper.emitted('input').length).toBe(1)
	})
})