
let vocabsArr = [];
let answer = {};
function checkAns(selectedAns, thisElm){
    //alert(selectedAns);
    let html = '';
    document.getElementById('ans-con').innerHTML = html;
    console.log('checkAns vocabsArr', vocabsArr);
    thisElm.classList.remove("right");
    thisElm.classList.remove("wrong");
    // const data = $(this).mcq();
    if(answer.Meaning == selectedAns){
        // alert('Right');
        html += '<p><strong>RIGHT</strong></p>';
        thisElm.classList.add('right');
    } else {
        html += '<p><strong>Wrong</strong></p>';
        thisElm.classList.add('wrong');
    }
    html += '<p>Correct Answer: '+ answer.Meaning +'</p>';
    console.log('answer["Other Meanings"]', answer['Other Meanings']);
    if(answer['Other Meanings'] !== undefined){
        html += '<ul>';
        html += '<li><strong>Other Meanings</strong></li>';
        answer['Other Meanings'].forEach((val) => {
            html += '<li>'+ val +'</li>';
        });
        html += '</ul>';
    }
    if(answer.Examples !== undefined){
        html += '<ul>';
        html += '<li><strong>Examples</strong></li>';
        answer.Examples.forEach((val) => {
            html += '<li>'+ val +'</li>';
        });
        html += '</ul>';
    }
    
    document.getElementById('ans-con').innerHTML = html;
    return;
}

function loadContent(){
    const rnd = _.sampleSize(vocabsArr, 5);
    const options = _.shuffle(rnd)
    answer.Meaning = rnd[0].meaning;
    answer['Other Meanings'] = rnd[0].otherMeanings;
    answer.Examples = rnd[0].examples;
    console.log('rnd', rnd);
    console.log('options', options);
    console.log('answer', answer);
    let html = '';
    options.forEach(function(option, index){
        console.log('index', index);
        console.log('option', option);
        html += '<li onclick="checkAns(\''+option.meaning+'\', this)">'+option.meaning+'</li>'
    });
    document.getElementById('question').innerHTML = rnd[0].word;
    document.getElementById('opt-list').innerHTML = html;
}
document.addEventListener("DOMContentLoaded", function() {
    
    const app = firebase.app();
    const db = firebase.firestore();
    const vocabsRef = db.collection('vocabs');
    vocabsRef.get().then(vocabs => {
        vocabs.forEach(vocab => {
            const data = vocab.data();
            vocabsArr.push(data)
            console.log('data', data);
            console.log('vocabsArr',vocabsArr);
        });
    }).then(function(){
        loadContent();
    });
    
    // const vocab1 = db.collection('vocabs').doc('vocab1');
    // vocab1.get().then(doc => {
    //     const data = doc.data();
    //     console.log(data);
    // });
    
});

/*
vocabs collection contains unique doc for each vocab
allow write: if !exists(/databases/$(database)/documents/unique_ms/{m});
*/