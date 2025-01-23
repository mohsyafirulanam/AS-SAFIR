/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  let menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
      menuBtn.className += " responsive";
  } else {
      menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() { headerShadow() };

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
  } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
let typingEffect = new Typed(".typedText", {
  strings: ["Designer", "Photograph", "Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

/* -- HOME -- */
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', { delay: 100 });
sr.reveal('.featured-text-info', { delay: 200 });
sr.reveal('.featured-text-btn', { delay: 200 });
sr.reveal('.social_icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 300 });

/* -- PROJECT BOX -- */
sr.reveal('.project-box', { interval: 200 });

/* -- HEADINGS -- */
sr.reveal('.top-header', {});

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
});

srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
});

srRight.reveal('.skills-box', { delay: 100 });
srRight.reveal('.form-control', { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
      } else {
          document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
      }
  });
}

window.addEventListener('scroll', scrollActive);

/* ----- SUPABASE INTEGRATION ----- */
const { createClient } = supabase;
const supabaseUrl = 'https://bpgiwusncskfisjtekwp.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZ2l3dXNuY3NrZmlzanRla3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjY3NjUsImV4cCI6MjA1MjgwMjc2NX0.ncdfGUdn7ZApUgZfze8qJKHx6xxIVtguTCm7s_jBsOQ'; // Ganti dengan kunci API Anda
const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi untuk mengirim pesan
async function sendMessage() {
  const nameField = document.querySelector('.input-field[placeholder="Name"]');
  const emailField = document.querySelector('.input-field[placeholder="Email"]');
  const messageField = document.querySelector('.text-area textarea');

  const name = nameField.value;
  const email = emailField.value;
  const message = messageField.value;

  // Validasi input
  if (!name || !email || !message) {
      alert('Semua field harus diisi!');
      return;
  }

  try {
      const { data, error } = await supabase
          .from('contacts') // Ganti dengan nama tabel Anda
          .insert([
              { name: name, email: email, message: message }
          ]);

      if (error) {
          console.error('Error inserting data:', error);
          alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      } else {
          console.log('Data inserted successfully:', data);
          alert('Pesan Anda telah dikirim!');

          // Kosongkan form setelah berhasil mengirim pesan
          nameField.value = '';
          emailField.value = '';
          messageField.value = '';
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      alert('Terjadi kesalahan yang tidak terduga.');
  }
}

// Fungsi untuk mengambil pesan
async function fetchMessages() {
  try {
      const { data, error } = await supabase
          .from('contacts') // Ganti dengan nama tabel Anda
          .select('*');

      if (error) {
          console.error('Error fetching data:', error);
          alert('Gagal mengambil data.');
      } else {
          console.log('Data fetched:', data);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      alert('Terjadi kesalahan yang tidak terduga saat mengambil data.');
  }
}

// Fungsi untuk memperbarui pesan
async function updateMessage(id, updatedData) {
  try {
      const { data, error } = await supabase
          .from('contacts') // Ganti dengan nama tabel Anda
          .update(updatedData)
          .eq('id', id);

      if (error) {
          console.error('Error updating data:', error);
          alert('Gagal memperbarui data.');
      } else {
          console.log('Data updated successfully:', data);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      alert('Terjadi kesalahan yang tidak terduga saat memperbarui data.');
  }
}

// Fungsi untuk menghapus pesan
async function deleteMessage(id) {
  try {
      const { data, error } = await supabase
          .from('contacts') // Ganti dengan nama tabel Anda
          .delete()
          .eq('id', id);

      if (error) {
          console.error('Error deleting data:', error);
          alert('Gagal menghapus data.');
      } else {
          console.log('Data deleted successfully:', data);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      alert('Terjadi kesalahan yang tidak terduga saat menghapus data.');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-control");

  if (form) {
      form.addEventListener("submit", function (event) {
          event.preventDefault(); // Mencegah reload halaman setelah submit
          sendMessage(); // Panggil fungsi untuk mengirim pesan
      });
  } else {
      console.error('Form tidak ditemukan di DOM.');
  }
});
