import axios from '../Axios/Api';

const Categ_Api="categ"

export const fetchCategories=async()=>{
    return await axios.get(Categ_Api);
}

export const fetchCategoryById=async(categoryId)=>{
    return await axios.get(Categ_Api + '/'+ categoryId);
}

export const delCategotegory=async(categoryId)=>{
    return await axios.delete(Categ_Api +'/'+ categoryId);
}

export const addCategory=async(category)=>{
    return await axios.post(Categ_Api,category);
}

export const editCategory=(_id,category)=>{
    return  axios.put(Categ_Api +'/'+ _id,category)
}