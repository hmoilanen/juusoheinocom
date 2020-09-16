import { mount } from '@vue/test-utils'
import baseText from '@/components/base/_BaseText.vue'

describe('_BaseText.vue', () => {
	it('display string in component through slot', () => {
		const text = 'test text'
		const wrapper = mount(baseText, {
			slots: {
				default: text
			}
		})

		expect(wrapper.text()).toContain(text)
	})
})