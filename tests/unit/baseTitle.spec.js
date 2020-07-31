import { mount } from '@vue/test-utils'
import baseTitle from '@/components/base/_base-title.vue'

describe('baseTitle.vue', () => {
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