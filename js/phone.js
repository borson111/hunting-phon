const phonLoading = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data;
    phoneSection(phones)
}
 const phoneSection = phones => {
    console.log(phones)
    const phoneCart = document.getElementById('phone-cart');
    phoneCart.textContent = ''

    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 6){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    }

    phones = phones.slice(0,6) 

    phones.forEach(phone => {
       const phonDiv = document.createElement('div');
       phonDiv.classList = `card bg-gray-100 shadow-xl `
       phonDiv.innerHTML = `
         <figure>
    <img
      src="${phone.image}"
      alt="${phone.phone_name}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick = "handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
       `
       phoneCart.appendChild(phonDiv)
    });
    toggleLoadingSpinner(false)
 }
 phonLoading()

//  search handel
const handelSearch = () => {
    toggleLoadingSpinner(true)
    const searchFild = document.getElementById('search-fild');
    const searchValue = searchFild.value;
    console.log(searchValue);
    phonLoading(searchValue);
}

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
   if(isLoading){
    loadingSpinner.classList.remove('hidden');
   }else{
    loadingSpinner.classList.add('hidden');
   }
}

// handle show all
const handelShowAll = () => {
  handelSearch()
}

// handle show detail
const handelShowDetails = async(id) => {
  console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data;
    console.log(phone) 
    showDetail(phone)
 
}

// showData
const showDetail = (phone) => {
  my_modal_5.showModal()

  const showDetailAboutPhone = document.getElementById('show-detail-About-Phone');
  showDetailAboutPhone.innerHTML = `

  
  <div class="card-body items-center text-center">
  <figure class="px-10 py-10  ">
    <img
      src="${phone.image}"
      alt="${phone.name}"
      class="rounded-xl" />
  </figure>
    <h2 class="card-title">${phone.name}</h2>
    
  </div>
  
<div class = "py-3">
  <p><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
  <p><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
  <p><span class="font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
  <p><span class="font-bold">Slug: </span>${phone.slug}</p>
  <p><span class="font-bold">Release data: </span>${phone.releaseDate}</p>
  <p><span class="font-bold">Brand: </span>${phone.brand}</p>
  <p><span class="font-bold">GPS: </span>${phone.others.GPS}</p>
</div>

  `
}
