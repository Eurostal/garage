import { mount } from '@vue/test-utils'
import { assert, describe, expect, it } from 'vitest'

test('mount component', async () => {
  var App = () => import('./src/configurator/store/index.js')
  expect(App).toBeTruthy()

  const wrapper = mount(App, {
    props: {
      count: 4,
    },
  })

  // expect(wrapper.text()).toContain('4 x 2 = 8')
  // expect(wrapper.html()).toMatchSnapshot()

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 3 = 12')

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 4 = 16')
})

describe('suite name', () => {
  it('foo', () => {
    expect(1 + 1).toEqual(2)
    expect(true).to.be.true
  })

  it('bar', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})

// test('mount component', async () => {
//   // expect(StoreAPI).toBeTruthy()
//   // const wrapper = mount(StoreAPI, {
//   //   propsData: {
//   //     count: 4,
//   //   },
//   // })
//   // expect(wrapper.text()).toContain('4 x 2 = 8')
//   // expect(wrapper.html()).toMatchSnapshot()
//   // await wrapper.get('button').trigger('click')
//   // expect(wrapper.text()).toContain('4 x 3 = 12')
//   // await wrapper.get('button').trigger('click')
//   // expect(wrapper.text()).toContain('4 x 4 = 16')
//   expect(1 + 1).toEqual(2)
// })
