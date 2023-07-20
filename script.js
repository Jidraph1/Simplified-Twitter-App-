let contComments = document.querySelector('.cont_comments')

function getComments(postID) {
  fetch(`https://jsonplaceholder.typicode.com/comments`)
  .then((res) => res.json())
  .then((data) => {
    let postComments = data.filter((comment) => comment.postId == postID)
    // console.log(postComments);
    postComments.forEach((comment) =>{
      contComments.innerHTML += `
      <div class="fancy">
      <div>
      <img src="maleavatar.jpeg" alt="" >
      </div> 
      <div> 
      <h3>${comment.name}</h3>
      <p>${comment.body}</p></div>
      <div class="icons"> 
      <span><p> <img  src="images/comment-removebg-preview.png" >12</p>
      </span>
     <span><p> <img  src="images/retweet-removebg-preview.png" >8</p>
     </span> 
      <span><p> <img  src="images/lovehearet-removebg-preview.png" >19</p>
      </span>
  </div>
    </div>
      </div>
      `
    })
  });
  
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      const selectedUser = users[2];

      document.getElementById("user-name").textContent = selectedUser.name;
      document.getElementById(
        "user-email"
      ).textContent = `Email: ${selectedUser.email}`;
      document.getElementById(
        "user-website"
      ).textContent = `Website: ${selectedUser.website}`;

      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`
      )
        .then((response) => response.json())
        .then((posts) => {
          const timeline = document.getElementById("timeline");

          posts.forEach((post) => {
            const tweet = document.createElement("div");
            tweet.className = "tweet";
            tweet.innerHTML = `
              <div class='tweeted_section'> 
            
              <div>
             <img src="maleavatar.jpeg" alt="" >
             </div> 
             <div>
                <p class="title">${selectedUser.name} 
                <img class='tiny-images' src="images/verification-removebg-preview.png" > 
                <img class='tiny-images' src="images/tweeeeet-removebg-preview.png"></p>
                <p class="body">${post.body}</p>
                <div class="icons"> 
                <span class="comment-btn" onclick="getComments(${post.id})" ><p> <img  src="images/comment-removebg-preview.png" >200</p>
                </span>
               <span><p> <img  src="images/retweet-removebg-preview.png" >200</p>
               </span> 
                <span><p> <img  src="images/lovehearet-removebg-preview.png" >200</p>
                </span>
                
              </div>
            </div>
                </div>
                `;
            timeline.appendChild(tweet);
          });
        });
    });

  document.getElementById("tweet-button").addEventListener("click", () => {
    const tweetInput = document.getElementById("tweet-input");
    const tweetText = tweetInput.value;

    const tweet = document.createElement("div");
    tweet.className = "tweet";
    tweet.innerHTML = `
      <div> 

      <p class="title">New Tweet</p>
      <p class="body">${tweetText}</p>
      <p class="email">Author: Your Email</p></div>

      `;

    const timeline = document.getElementById("timeline");
    timeline.insertBefore(tweet, timeline.firstChild);

    tweetInput.value = "";
  });
});
