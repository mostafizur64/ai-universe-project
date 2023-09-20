const fetchData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    showCartDetail(data.data.tools.slice(0, 6));
   

}
//show data in card
const showCartDetail = (cardDetails) => {

    const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML="";
    cardDetails.forEach(singleCard => {
        cardContainer.innerHTML += `
        <div class="col">
        <div class="card h-100">
          <img src="${singleCard.image}" class="card-img-top" height="250" width="250" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
           <ol class="list-align">${showCardLiList(singleCard.features.slice(0,3))}</ol>
            <div><hr></div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <p>${singleCard.name}</p>
                    <p><i class="fas fa-calendar-alt "></i> ${singleCard.published_in}</p>
                </div>
                <div>
                <i onclick="showModal('${singleCard.id}')" class="fas fa-arrow-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </div>
            </div>
          </div>
        </div>
    `;
        toggleSpinner(false);
    });
 
}
// show list item 
const showCardLiList = (li) => {
    let innerHTML = ``;
    for (const demo of li) {

        innerHTML += `<li>${demo}</li>`;
    }
    return innerHTML;

}
// show modal on click arrow button 
const showModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showModalDetails(data);

}
// show modal api data on modal section
const modalContainer = document.getElementById('modal-body');
const showModalDetails = (singleModalDetails) => {
    // console.log(singleModalDetails.data);
    const div = document.createElement('div');
    // div.classList.add("row", "d-flex", "p-4");
    div.classList.add("row", "d-flex", "row-cols-1","row-cols-lg-2","g-4","p-0"); 
    div.innerHTML = `
<!-- first modal card -->
<div class=" h-50%">
  <div class="card first-modal">
    <div class="card-body">
      <h4 class="card-title">${singleModalDetails.data.description}</h4>
      <div class="d-flex justify-content-around gap-2">
        <div class="col-lg-4 bg-white rounded-2 p-4  text-center">
          <h3 class="fs-5" style="color:#03A30A;">${singleModalDetails.data.pricing[0].price ? singleModalDetails.data.pricing[0].price:"Free <br> of Cost/</br>"}<br>${singleModalDetails.data.pricing[0].plan}</h3>
        </div>
        <div class="col-lg-4 bg-white rounded-2 p-4 text-center">
          <h3 class="fs-5" style="color: #F28927;">${singleModalDetails.data.pricing[1].price ? singleModalDetails.data.pricing[1].price:'Free Of <br> Cost'}<br>${singleModalDetails.data.pricing[1].plan}</h3>
        </div>
        <div class="col-lg-4 bg-white rounded-2 p-4 text-center">
          <h3 class="fs-5" style="color: #EB5757;">${singleModalDetails.data.pricing[2].price ? singleModalDetails.data.pricing[2].price:'Free of Cost /'}<br>${singleModalDetails.data.pricing[2].plan}</h3>
        </div>
      </div>
      <!-- modal features and integrations  -->
      <div class="d-flex  mt-4">
        <div class="sm:col-12 lg:col-6">
          <h2>Features</h2>
         <ul>${modalFeaturesShow(singleModalDetails.data.features)}</ul>
        </div>
        <div class="col-6 lg:col-lg-6">
          <h2>Integrations</h2>
          
          <ul>${showCardLiList(singleModalDetails.data.integrations.slice(0, 3)?singleModalDetails.data.integrations.slice(0, 3):'No data Found')}</ul>
         
        </div>
      </div>

    </div>
  </div>
</div>
<!-- second modal card -->
<div class="h-100%">
 
    <div class="card second-card">
      <div class="card-body" style="position: relative;">
        <img class="img-fluid" src="${singleModalDetails.data.image_link[1]?singleModalDetails.data.image_link[1]:'https://picsum.photos/500/300?random=2'}" alt="">
       <div style="position: absolute; top: 30px; right:20px;">
        <button id="button" class="btn btn-danger d-none">${singleModalDetails.data.accuracy.score} accuracy</button>
       </div>
         <div class="mt-4">
         <h3 class="text-center">${singleModalDetails.data.input_output_examples[0].input?singleModalDetails.data.input_output_examples[0].input:'Can you give any example?'}</h3>
         <p class="card-text text-center">${singleModalDetails.data.input_output_examples[0].output?singleModalDetails.data.input_output_examples[0].output:'No! Not Yet! Take a break!!!'}</p>
         </div>
      </div>
    </div>
</div>
`;
    modalContainer.innerHTML = '';
    modalContainer.appendChild(div);
    
// Accuracy button 
const value = document.getElementById('button');
if(singleModalDetails.data.accuracy.score){
   value.classList.remove('d-none');
}
else{
   value.classList.add('d-none');

}


}
// modal features list show 
const modalFeaturesShow = (li) => {
    const values2 = Object.values(li);
    let innerHTML = ``;
    for (const value of values2) {

        innerHTML += `<li>${value.feature_name.slice(0.3)}</li>`

    }
    return innerHTML;
}



// spinner section add
const toggleSpinner = isLoading => {
    const spinnerLoad = document.getElementById('spinner-loader');
    if (isLoading) {
        spinnerLoad.classList.remove('d-none');
    }
    else {
        spinnerLoad.classList.add('d-none');
    }
}
// show more card button
const showMore = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    showCartDetail(data.data.tools);
   
}

toggleSpinner(true);


fetchData();


