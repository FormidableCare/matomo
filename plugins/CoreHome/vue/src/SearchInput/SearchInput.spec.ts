/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { mount } from '@vue/test-utils';
import SearchInput from './SearchInput.vue';

describe('CoreHome/SearchInput', () => {
  it('renders the search icon and translated placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('.icon-search').exists()).toBe(true);
    expect(wrapper.find('input').attributes('placeholder')).toBe('General_Search');
  });

  it('reflects the provided model value', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'segment',
      },
    });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('segment');
  });

  it('emits update:modelValue when the input value changes', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    });

    await wrapper.find('input').setValue('country');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['country']);
  });

  it('clears to an empty string when the clear button is clicked', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'country',
        showClear: true,
      },
    });

    await wrapper.find('.mtm-searchInput__clear').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });

  it('gives the clear button a translated title', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'country',
        showClear: true,
      },
    });

    expect(wrapper.find('.mtm-searchInput__clear').attributes('title')).toBe('General_Clear');
  });

  it('focuses the input when the focused prop becomes true', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        focused: false,
      },
      attachTo: document.body,
    });

    try {
      expect(document.activeElement).not.toBe(wrapper.find('input').element);

      await wrapper.setProps({ focused: true });
      vi.advanceTimersByTime(10);

      expect(document.activeElement).toBe(wrapper.find('input').element);
    } finally {
      vi.useRealTimers();
      wrapper.unmount();
    }
  });
});
