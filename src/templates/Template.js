import getData from '@utils/getData.js';
import github from '@images/github.png'
import twitter from '@images/twitter.png'
import instagram from '@images/instagram.png'

const Template = async () => {
  const data = await getData();
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
            <img src="${data.picture.large}" alt=`This is ${data.name.first}`>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_title">Hi! my name is:</p>
          <p class="card_value">${data.name.first} ${data.name.last}</p>
        </div>
        <div class="card_userdata">
          <ul>
            <li>`Email: ${data.email}`</li>
            <li>`From: ${data.location.country}`</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/CapitanSidoku">
            <img src="${twitter}" alt="twitter logo" />
          </a>
          <a href="https://github.com/Alonso-Pablo">
            <img src="${github}" alt="github logo" />
          </a>
          <a href="https://www.instagram.com/sidoku_art/">
            <img src="${instagram}" alt="instagram logo"/>
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;
