import Axios from'../Axios/Api';
const Categ_Api="categ"

export const fetchCategories=async()=>{
    return await Axios.get(Categ_Api);
}

export const fetchCategoryById=async(categoryId)=>{
    return await Axios.get(Categ_Api + '/'+ categoryId);
}

export const delCategotegory=async(categoryId)=>{
    return await Axios.delete(Categ_Api +'/'+ categoryId);
}

export const AddCategory=async(category)=>{
    return await Axios.post(Categ_Api,category);
}

export const editCateg=(_id,category)=>{
    return  Axios.put(Categ_Api +'/'+ _id,category)
}