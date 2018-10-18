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
    
   var calculateTotal = function(type){
        var sum =0;
        data.allItems[type].forEach(function(curr){
            sum+=curr.value;
        });
        data.totals[type]=sum;
   }
   var data = {
        allItems: {
            exp:[],
            inc:[]
                 },   
        totals:{
             exp:0,
                inc:0
     },
     budget :0,
     percentage: -1 
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
      calculateBudget: function(){
          //calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        
        //calculate the bidget : income - expense
        data.budget = data.totals.inc - data.totals.exp; 
          //calculate the percentage of income that we spent
          if(data.totals.inc>0){
          data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
        }
        },
      getBudget: function(){
          return{
              budget: data.budget, 
              totalInc: data.totals.inc,
              totalExp : data.totals.exp,
              percentage : data.percentage
          }
      }
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
        expenseContainer: ".expenses__list",
        budgetLabel : ".budget__value",
        totalIncLabel : ".budget__income--value",
        totalExpLabel : ".budget__expenses--value",
        percentageLabel : ".budget__expenses--percentage" 
    };

    return{
        getinput: function(){

            return{
             type : document.querySelector(DomStrs.inputType).value ,
             desc : document.querySelector(DomStrs.descriptionType).value ,
             value : parseFloat(document.querySelector(DomStrs.valueType).value)
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
            fieldsA = Array.from(fields);
            fieldsArr = Array.prototype.slice.call(fieldsA)
            
            fieldsArr.forEach(function(current,index,array){
                current.value ="";
            
            });
            fieldsArr[0].focus()
        },
        dislayBudget: function(obj){
            document.querySelector(DomStrs.budgetLabel).textContent = obj.budget;
            document.querySelector(DomStrs.totalIncLabel).textContent = obj.totalInc;
            document.querySelector(DomStrs.totalExpLabel).textContent = obj.totalExp;
            if(obj.percentage > 0 ){
                document.querySelector(DomStrs.percentageLabel).textContent = obj.percentage+"%";
            }
            else{
                document.querySelector(DomStrs.percentageLabel).textContent ="***";
            }


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
    
    var updateBudget = function(){
          //5.calculate the budget
        budgetCtrl.calculateBudget();
        //5.1return budget
        var budget = budgetCtrl.getBudget();console.log(budget);
        //6.Display.the budget on the ui
        UICtrl.dislayBudget(budget);
        
    }
  
    var  ctrlAddItem  = function(){
        var input,newItem;

       
        //1.get the field input data
        var input = UICtrl.getinput();console.log(input);
       if(input.desc!=""&& !isNaN(input.value)&&input.value > 0){
        //2.get the itemm to the budget controller
       var newItem = budgetCtrl.addItem(input.type,input.desc, input.value);
        //3.add the new item to the Ui
        UICtrl.addListItem(newItem,input.type);
        //4.CLEAR the field
        UICtrl.clearField();
        //5.CALCULATE & UPDATE budget
        updateBudget();   
    }
    };

    return{
        init : function() {
            console.log("The app is running. ");
            //INITIALIZE all Labes at 0
            UICtrl.dislayBudget({
                budget: 0, 
                totalInc: 0,
                totalExp : 0,
                percentage : -1
            })
            setupEventlisteners();
        }
    }; 
   
    
})(budgetController,UIController);

Controller.init();