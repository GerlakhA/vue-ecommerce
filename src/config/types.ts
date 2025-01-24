export interface ISneakers {
	id: string
	title: string
	price: number
	imageUrl: string
}

export interface ISneakerById {
	id: string
	title: string
	price: number
	imageUrl: string
	isFavorite: boolean
	favoriteId: number | null
	isAdded: boolean
}

export interface ITest {
	id: string
	name: string
	price: number
}
