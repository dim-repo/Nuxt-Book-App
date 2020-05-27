import { getAccessorType } from 'typed-vuex';
import * as book from './book';

export const accessorType = getAccessorType({
	modules:{
		book
	}
})