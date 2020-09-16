import { mount } from '@vue/test-utils'
import baseTitle from '@/components/base/_BaseTitle.vue'

describe('_BaseTitle.vue', () => {
	it('display string / text in component through slot', () => {
		const text = 'test text'
		const wrapper = mount(baseTitle, {
			slots: {
				default: text
			}
		})

		expect(wrapper.text()).toContain(text)
	})
})