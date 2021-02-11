export const state = () => ({
	counter: 0
})

export const mutations = {
	increment (state) {
		console.log('store::increment')
		state.counter++
		console.log(state.counter)
	}
}
