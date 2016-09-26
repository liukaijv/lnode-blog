
export const getCategory = ({category})=> {
  	let keys = Object.keys(category.entity);
  	keys.forEach((item, i)=>{
  		if(category.entity[item] == null){
  			category.entity[item] = '';
  		}
  	}); 
  	return  category.entity;
}