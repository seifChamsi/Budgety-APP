// BUDGET CONTROLLER
var budgetController= (function(){

    //Expense Constructor
    var Expense = function(id,desc,value){
         this.id = id;
         this.desc = desc;
         this.value=value;
    };

    var Income = function(id,desc,value){
        this.id = id;
        this.desc = desc;
        this.value=value;
   };
    
   var data = {
        allItems: {
            exp:[],
            inc:[]
                 },   
        totals:{
             exp:0,
                inc:0
     } 
   };
   
  return{
      addItem: function(type,description,val){
        var newItem,id;
       //CREATE NEW id:
       if(data.allItems[type].length > 0){
        id =data.allItems[type][data.allItems[type].length - 1].id + 1;
       }
       else{
           id = 0;
       } 

        //CREATE new item based on "inc","exp"...
        if(type=='exp'){
            newItem = new Expense(id,description,val);
        }
        else if (type =='inc'){
            newItem = new Income(id,description,val)
        }
    //Push on our data structure 
        data.allItems[type].push(newItem)
        return newItem//return the new element
      },
  };

}());

//USER INTERFACE CONTROLLER
var UIController = (function(){
      
    var DomStrs = {
        inputType : ".add__type",
        descriptionType : ".add__description",
        valueType : ".add__value",
        inputBtn : ".add__btn",
        incomeContainer : ".income__list",
        expenseContainer: ".expenses__list"
    };

    return{
        getinput: function(){

            return{
             type : document.querySelector(DomStrs.inputType).value ,
             desc : document.querySelector(DomStrs.descriptionType).value ,
             value : document.querySelector(DomStrs.valueType).value
            };
        },getDOMstings: function(){
            return DomStrs;
        },

        addListItem: function(obj, type){
            var html,newHtml,element;
            //1.CREATE a HTML string with placeholder text
            if (type === 'inc') {
                element = DomStrs.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DomStrs.expenseContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //2.Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id);  
            newHtml = newHtml.replace("%desc%",obj.desc);           
            newHtml = newHtml.replace("%value%",obj.value); 

            //3.Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },
        clearField: function(){
            var fields,fieldsA,fieldsArr;

            fields = document.querySelectorAll(DomStrs.descriptionType + ', '+DomStrs.valueType);
            fieldsA = Array.from(fields);console.log(fieldsA)
            fieldsArr = Array.prototype.slice.call(fieldsA)
            console.log(fieldsArr);
            fieldsArr.forEach(function(current,index,array){
                current.value ="";
            
            });
            fieldsArr[0].focus()
        }
        
    };

})();


//GLOBAL APP CONTROLLER
var Controller = (function(budgetCtrl,UICtrl)
{
    
    var setupEventlisteners = function(){

        var DOM = UICtrl.getDOMstings() ;

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode ==13){            
                ctrlAddItem();
            }
        })

    };
    
  
    var  ctrlAddItem  = function(){
        var input,newItem;
        //1.get the field input data
        var input = UICtrl.getinput();console.log(input);
        //2.get the itemm to the budget controller
       var newItem = budgetCtrl.addItem(input.type,input.desc, input.value);
        //3.add the new item to the Ui
        UICtrl.addListItem(newItem,input.type);
        //4.CLEAR the field
        UICtrl.clearField();
        //4.calculate the budget

        //5.Display.the budget on the ui

    };

    return{
        init : function() {
            console.log("The app is running. ");
            setupEventlisteners();
        }
    }; 
   
    
})(budgetController,UIController);

Controller.init();