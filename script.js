let container = document.querySelector(".main__container")
let contentRecipe = document.querySelector(".recipe__content")
let modalContainer = document.querySelector(".modal__container")
let modalContent = document.querySelector(".modal__content")
let addRecipe = document.querySelector(".modal__add-recipe")
let editRecipe = document.querySelector(".modal__edit-recipe")
let editModal = document.querySelector("#modal-edit")
let body = document.querySelector("body")


let recipeAll = [
    {
        name: 'Bobó de Camarão',
        img: 'https://cdn.pixabay.com/photo/2018/09/26/00/15/bobo-shrimp-3703528_960_720.jpg',
        ingredients: ['1 kg de camarão fresco',
            'sal',
            '3 dentes de alho picados e amassados',
            'suco de 1 limão',
            'pimenta-do-reino',
            '1 kg de mandioca (prefira as que já vem embaladas e descascadas, é mais prático)',
            '3 cebolas (1 cortada em rodelas e 2 raladas)',
            '1 folha de louro',
            '6 colheres (sopa) de azeite de oliva',
            '2 vidros de leite de coco',
            '1 maço de cheiro-verde picado',
            '2 latas de molho pronto de tomate', 
            '2 pimentões verdes bem picadinhos',
            '2 colheres (sopa) de azeite de dendê'
            ],
        instructions: ['Lave os camarões e tempere com sal, alho, pimenta e limão, deixe marinar.',
    
            'Pegue uma panela com água e cozinhe a mandioca em pedacinhos, com louro e a cebola em rodelas.',
            
            'Quando estiver mole, acrescente um vidro de leite de coco.',
            
            'Deixe esfriar um pouco e bata no liquidificador.',
            
            'Esquente o azeite de oliva, junte a cebola ralada e deixe dourar.',
            
            'Acrescente os camarões e frite.',
            
            'Adicione as 2 latas de pomarola, o cheiro-verde, o pimentão e deixe cozinhar por alguns minutos.',
            
            'Junte na mesma panela, a mandioca batida no liquidificador, outro vidro de leite de coco e o azeite de dendê.',
            
            'Deixe levantar fervura e está pronto.']
    },
    {
        name: 'Lasanha à Bolonhesa',
        img: 'https://cdn.pixabay.com/photo/2021/02/06/11/51/food-5987888_960_720.jpg',
        ingredients: [
            '3 colheres de margarina',
            '4 colheres de farinha de trigo',
            '2 xícaras de leite',
            '2 xícaras de creme de leite',
            'sal e noz-moscada a gosto',
            '1 colher de óleo',
            '2 dentes de alho amassados',
            '1 cebola picada',
            '300 g de carne moída',
            '3 xícaras de polpa de tomate batida no liquidificador',
            '3/4 xícara de água quente',
            'sal a gosto',
            '200 g de presunto fatiada',
            '200 g de mussarela fatiada',
            '250 g de massa para lasanha'
        ],
        instructions: [
            'Molho branco:',
    
            'Derreta a margarina e doure a farinha em fogo baixo mexendo sempre, junte o leite aos poucos.',
    
            'Cozinhe até obter um molho encorpado, acrescente o creme de leite e tempere com sal e noz-moscada.',
    
            'Reserve.',
    
            'Molho a bolonhesa:',
    
            'Aqueça o óleo junte o alho e a cebola até dourar.',
    
            'Acrescente a carne moída até fritar, quando a carne estiver frita acrescente a polpa de tomate e a água misture o sal e cozinhe até ferver.',
    
            'Montagem:',
    
            'Em um refratário grande, coloque uma camada de molho à bolonhesa, massa para lasanha, presunto, mussarela, molho branco.',
    
           ' Adicione mais massa para lasanha presunto e mussarela e termine com molho à bolonhesa.',
    
            'Se quiser, polvilhe um pouco de queijo parmesão ralado e leve ao forno para gratinar por 20 minutos.'
        ]
    }
    
]

let localStorageRecipe = JSON.parse(localStorage.getItem("recipeAll"))
let recipeStorage = localStorage.getItem("recipeAll") != null ?
localStorageRecipe : recipeAll



function updateLocalStorage(){
    localStorage.setItem("recipeAll",  JSON.stringify(recipeStorage))
}

function showRecipe(recipeStorage){
    
    let divRecipe = ""
    
    if (recipeStorage.length === 0){

        container.innerHTML = ""

    }else{
        
        for (i in recipeStorage){
            
            divRecipe += `<div class="recipe" onclick="openRecipe(${i})">
                            <img class="img-recipe" src="${recipeStorage[i].img}" alt="recipe"> 
                            <div class="recipe-title"> ${recipeStorage[i].name} </div>
                         </div>`
            
            container.innerHTML = divRecipe
        }
    }
}
//<button class="btn-open" onclick="openRecipe(${i})"> Abrir </button>
showRecipe(recipeStorage)


function addNewRecipe(){
    let nameRecipe = document.querySelector("#name-recipe").value
    let imgRecipe = document.querySelector("#img-recipe").value
    let ingredients = document.querySelector("#ingredients").value
    let instructions = document.querySelector("#instructions").value
    ingredients = ingredients.split(",")
    instructions = instructions.split(".")
    
    
    if (imgRecipe== ""){
        imgRecipe = "images/img-default.png"
    }

    let newRecipe = {
        name: nameRecipe,
        img: imgRecipe,
        ingredients: ingredients,
        instructions: instructions
        }
    

    if (validateFields()) {

        recipeStorage.push(newRecipe)
    
        updateLocalStorage()
        
        addRecipe.style.display = "none"
        modalContainer.style.display = "none"
        body.style.overflow = "auto"

        showRecipe(recipeStorage)
        // Alerta
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Receita adicionada',
            showConfirmButton: false,
            timer: 1600
          })
    }
}

function contentOpenRecipe(i){
    divContentRecipe = ""
    let li = ""
    let ol = ""

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-validação de array-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    let isArrayIngredients = Array.isArray(recipeStorage[i].ingredients)
    let isArrayInstructions = Array.isArray(recipeStorage[i].instructions)
    if (isArrayIngredients){
        li = '<li>' + recipeStorage[i].ingredients.join('</li><li>') + '</li>'
    }else {
        let arrayIngredients =  recipeStorage[i].ingredients.split(",")
        li = '<li>' +arrayIngredients.join('</li><li>') + '</li>'
    }
    
    if (isArrayInstructions){
        ol = '<li>' + recipeStorage[i].instructions.join('</li><li>') + '</li>'
    }else {
        let arrayInstructons =  recipeStorage[i].instructions.split(".,")
        ol = '<li>' +arrayInstructons.join('</li><li>') + '</li>'
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    divContentRecipe += `<header class='content-header'>
                            <img class="content-header-img" src="${recipeStorage[i].img}" alt="recipe"> 
                            <h1>${recipeStorage[i].name}</h1>
                            <button id='close-recipe' onclick='closeRecipe()'><img src='icons/fechar.png' alt=''></button>
                        </header>
                        <div class='actions'>
                            <button class='btn__delete'onclick='deleteRecipe(${i})'><img src='icons/excluir.png' alt=''>Excluir</button>
                            <button class='btn__edit' onclick='editarRecipe(${i})'><img src='icons/editar.png' alt=''>Editar</button>
                        </div>
                        <div class='ingredients'><h2>Ingredientes</h2><ul>${li}</ul></div>
                        <div class='instructions'><h2>Modo de Preparo</h2><ol>${ol}</ol></div>`

    contentRecipe.innerHTML = divContentRecipe
    
}


function closeRecipe(){
    contentRecipe.style.display = "none"
    modalContent.style.display = "none"
    body.style.overflow = "auto"
}

function newRecipe(){
    cleanFields()
    addRecipe.style.display = "flex"
    modalContainer.style.display = "flex"
    body.style.overflow = "hidden"
}

function cancelNewRecipe(){
    addRecipe.style.display = "none"
    modalContainer.style.display = "none"
    body.style.overflow = "auto"
}


function openRecipe(i){
    
    contentOpenRecipe(i)
    contentRecipe.style.display = "flex"
    modalContent.style.display = "flex"
    body.style.overflow = "hidden"
}


function deleteRecipe(i){
    
    recipeStorage.splice(i, 1)
    closeRecipe()
    showRecipe(recipeStorage)
    updateLocalStorage()
    // Alerta
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Receita deletada',
        showConfirmButton: false,
        timer: 1600
      })
}

function cancelChangeRecipe(){
    editRecipe.style.display = "none"
    editModal.style.display = "none"
}


function editarRecipe(i){
    
    let divChangeRecipe = ""

        divChangeRecipe += `<label for='name-recipe'>Nome da receita</label>
                            <input type='text' class='input' id="change-name-recipe">
                            <label for='img-recipe'>Imagem da receita(url)</label>
                            <input type='text' class='input' id="change-img-recipe">
                            <label for='ingredients'>Ingredientes</label>
                            <input type='text' class='input' id="change-ingredients">
                            <label for='instructions'>Instruções</label>
                            <textarea  class='textarea' id='change-instructions' cols='30' rows='8'></textarea>
                            <div class='btn__modal'>
                                <button class='button btn-cancel' onclick='cancelChangeRecipe()'>Cancelar</button>
                                <button class='button' id='btn-save' onclick='saveChangeRecipe(${i})'>Salvar</button>
                            </div>`

    editRecipe.innerHTML = divChangeRecipe

    document.querySelector("#change-name-recipe").value = recipeStorage[i].name
    document.querySelector("#change-img-recipe").value = recipeStorage[i].img
    document.querySelector("#change-ingredients").value = recipeStorage[i].ingredients
    document.querySelector("#change-instructions").value = recipeStorage[i].instructions
    
    editRecipe.style.display = "flex"
    editModal.style.display = "flex"
    
}


function saveChangeRecipe(i){
    
    recipeStorage[i].name = document.querySelector("#change-name-recipe").value
    recipeStorage[i].img = document.querySelector("#change-img-recipe").value
    recipeStorage[i].ingredients = document.querySelector("#change-ingredients").value
    recipeStorage[i].instructions = document.querySelector("#change-instructions").value

    editRecipe.style.display = "none"
    editModal.style.display = "none"
   

    contentOpenRecipe(i)
    updateLocalStorage()
    showRecipe(recipeStorage)
    
}

function cleanFields(){
    document.querySelector("#name-recipe").value = ""
    document.querySelector("#img-recipe").value = ""
    document.querySelector("#ingredients").value = ""
    document.querySelector("#instructions").value = ""
}


function validateFields(){
   
   if ( document.querySelector("#name-recipe").reportValidity() && 
        document.querySelector("#ingredients").reportValidity() &&
        document.querySelector("#instructions").reportValidity()
   ){
       return true
   }
}