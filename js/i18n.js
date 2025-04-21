const translations = {
    ru: {
        title: "Резюме",
        name: "Михайлов Владимир",
        profession: "Java-разработчик",
        location: "Ереван, Армения",
        summary_title: "Обо мне",
        summary_content: "Я Java-разработчик с техническим образованием и практическим опытом создания веб-приложений. Имею 3+ года коммерческого опыта. За это время я освоил современные технологии и участвовал в коммерческих проектах. Научился читать чужой код, поддерживать legacy код. Также был опыт переписывания legacy кода.\n" +
            "Мой опыт сочетает как технические навыки, так и управленческий опыт.",
        experience_title: "Опыт работы",
        job_company: "Netcracker",
        job_title: "Инженер-программист",
        job_start_date: "02.10.2022",
        job_end_date: "Настоящее время",
        job_description_1: [
            "Занимался исправлением багов и устранением уязвимостей, а также добавлением нового функционала, включая поддержку внешних интеграций, используя разные протоколы (SOAP, HTTPs)",
            "Также занимался настройкой серверов под нужды проекта",
            "Был опыт в переписывании проекта на другой фреймворк."
        ],
        education_title: "Образование",
        education_speciality: "Информатика и вычислительная техника",
        education_institution_1: "Самарский университет",
        education_degree_1: "Бакалавр | 2023",
        skills_title: "Навыки",
        languages_title: "Языки",
        language_list: [
            "Русский - родной",
            "Английский - средний"
        ],
        interests_title: "Интересы",
        interests_content: "Математика, астрономия, история, компьютерные игры, спорт",
        footer: "© 2025 Михайлов Владимир. Все права защищены."
    },
    en: {
        title: "Resume",
        name: "Mikhailov Vladimir",
        profession: "Java Software engineer",
        location: "Yerevan, Armenia",
        summary_title: "About me",
        summary_content: "I am a Java software engineer with a technical education and practical experience in creating web applications. I have 3+ years of commercial experience. During this time I mastered modern technologies. I learned to read other people's code, support legacy code. I also had experience rewriting legacy code.\n" +
            "My background combines technical skills and management experience.",
        experience_title: "Work Experience",
        job_company: "Netcracker",
        job_start_date: "02.10.2022",
        job_end_date: "Present",
        job_title: "Software engineer ",
        job_title_1_base: "Software Engineer | 02/10/2022 - Present",
        job_description_1: [
            "I was engaged in fixing bugs and eliminating vulnerabilities, as well as adding new functionality, including support for external integrations using different protocols (SOAP, HTTPs)",
            "I was also engaged in setting up servers for the needs of the project",
            "I had experience in rewriting project to another framework."
        ],
        education_title: "Education",
        education_speciality: "Computer Science and Computing Machinery",
        education_institution_1: "Samara University",
        education_degree_1: "Bachelor | 2023",
        skills_title: "Skills",
        languages_title: "Languages",
        language_list: [
            "Russian - native",
            "English - intermediate"
        ],
        interests_title: "Interests",
        interests_content: "Mathematics, astronomy, history, computer games, sports",
        footer: "© 2025 Mikhailov Vladimir. All rights reserved."
    }
};

let currentLang = 'ru';
const DAYS_OF_YEAR = 365.25; // Учитываем високосные годы
const SECONDS_OF_HOURS = 3600;

function differentDate(startDate, endDate) {
    let date1 = new Date(startDate);
    let date2 = endDate ? new Date(endDate) : new Date(); // Если endDate не указан, берем текущую дату

    let differentYears = (date2.getTime() - date1.getTime()) / (DAYS_OF_YEAR * SECONDS_OF_HOURS * 24 * 1000);
    return Math.trunc(differentYears);
}


function setLanguage(lang, animate = true) {
    if (lang === currentLang && !animate) return;

    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    const sectionsToTranslate = document.querySelectorAll('[data-i18n-section]');
    const htmlElement = document.documentElement;
    const langTrigger = document.querySelector('.custom-select-trigger');
    // const langOptions = document.querySelector('.custom-options');
    const langOptionElements = document.querySelectorAll('.custom-option');


    function updateContent() {
        elementsToTranslate.forEach(element => {
            const key = element.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }

            if (key === 'job_start_date') {
                const startDate = translations[lang].job_start_date;
                const endDate = null;
                const yearsOfExperience = differentDate(startDate, endDate);
                const baseText = translations[lang].job_start_date + " - " + translations[lang].job_end_date;
                element.textContent = `${baseText} (${yearsOfExperience} ${getYearsText(lang, yearsOfExperience)})`;
            }
        });

        sectionsToTranslate.forEach(sectionElement => {
            const key = sectionElement.dataset.i18nSection;
            const translationArray = translations[lang] && translations[lang][key];
            if (translationArray && Array.isArray(translationArray)) {
                const listItems = sectionElement.querySelectorAll('li');
                listItems.forEach((li, index) => {
                    if (translationArray[index]) {
                        li.textContent = translationArray[index];
                    }
                });
            }
        });
        htmlElement.lang = lang;
        currentLang = lang;

        if (langTrigger) {
            const selectedOption = Array.from(langOptionElements).find(option => option.dataset.value === lang);
            if (selectedOption) {
                langTrigger.innerHTML = selectedOption.innerHTML + '<div class="arrow"></div>';
            }
        }
    }

    if (animate) {
        Promise.all([...elementsToTranslate, ...sectionsToTranslate].map(element => {
            return new Promise(resolve => {
                element.style.opacity = 0;
                setTimeout(resolve, 150);
            });
        })).then(() => {
            updateContent();
            return Promise.all([...elementsToTranslate, ...sectionsToTranslate].map(element => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        element.style.opacity = 1;
                        resolve();
                    }, 150);
                });
            }));
        });
    } else {
        updateContent();
    }


    function getYearsText(lang, years) {
        if (lang === 'ru') {
            const lastDigit = years % 10;
            if (years % 100 >= 11 && years % 100 <= 19) {
                return 'лет';
            } else if (lastDigit === 1) {
                return 'год';
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return 'года';
            } else {
                return 'лет';
            }
        } else if (lang === 'en') {
            return years === 1 ? 'year' : 'years';
        }
        return '';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const langTrigger = document.querySelector('.custom-select-trigger');
    const langOptions = document.querySelector('.custom-options');
    const langOptionElements = document.querySelectorAll('.custom-option');

    setLanguage('ru');

    if (langTrigger) {
        langTrigger.addEventListener('click', () => {
            langOptions.classList.toggle('open');
        });
    }

    if (langOptionElements) {
        langOptionElements.forEach(option => {
            option.addEventListener('click', function () {
                const lang = this.dataset.value;
                setLanguage(lang);
                langOptions.classList.remove('open');
            });
        });
    }

    // Закрываем dropdown при клике вне элемента
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!customSelectWrapper.contains(target)) {
            langOptions.classList.remove('open');
        }
    });
});

const customSelectWrapper = document.querySelector('.custom-select-wrapper');

