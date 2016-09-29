const state = {	
	files: [],
	error: '',
	progress: null	
}

const mutations = {	
	FILE_CLICK (state, files) {
		console.log(files)
	}
}

export default {
	state,
	mutations
}