import { useState, useEffect } from "react";
import { servicesData } from "./Services.jsx";

export default function Home() {
  /* ------------------------------------- Работа с картой ------------------------------------------------- */
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  const closeMap = () => {
    setShowMap(false);
  };

  // Автоматическое скрытие карты при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      if (showMap) {
        setShowMap(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMap]);

  /* ------------------------------------- Плавающая шапка ------------------------------------------------- */
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHoveringFlowHeader, setIsHoveringFlowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY < 50 ||
        currentScrollY < lastScrollY ||
        isHoveringFlowHeader
      ) {
        setIsHeaderVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > 50 &&
        !isHoveringFlowHeader
      ) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHoveringFlowHeader]);

  // Обработчики ховера
  const handleFlowHeaderMouseEnter = () => {
    setIsHoveringFlowHeader(true);
    setIsHeaderVisible(true);
  };

  const handleFlowHeaderMouseLeave = () => {
    setIsHoveringFlowHeader(false);
    if (window.scrollY > 50) {
      setIsHeaderVisible(false);
    }
  };

  /* --------------- Модальное окно для контактов ------------------ */
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    value: "",
    label: "",
  });

  const handleContactClick = (e, type, value, label) => {
    e.preventDefault();

    // Для карты сразу открываем, без модального окна
    if (type === "map") {
      toggleMap();
      return;
    }

    setModalData({ type, value, label });
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalData.type === "email") {
      window.location.href = `mailto:${modalData.value}`;
    } else if (modalData.type === "phone") {
      window.location.href = `tel:${modalData.value}`;
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  /* --------------- Якорный переход ------------------ */
  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 100;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
        duration: 1000,
      });
    }
  };

  /* ------------------------------------------ Бургер-меню ------------------------*/
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------------------------------ Адаптив --------------------------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Обновим обработчик скролла для мобильных
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMobile) {
        if (currentScrollY < 50 || currentScrollY < lastScrollY) {
          setIsHeaderVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsHeaderVisible(false);
        }
      } else {
        if (
          currentScrollY < 50 ||
          currentScrollY < lastScrollY ||
          isHoveringFlowHeader
        ) {
          setIsHeaderVisible(true);
        } else if (
          currentScrollY > lastScrollY &&
          currentScrollY > 50 &&
          !isHoveringFlowHeader
        ) {
          setIsHeaderVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHoveringFlowHeader, isMobile]);

  return (
    <div>
      {/* ------------------------------------- Модальное окно ------------------------------------------------- */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleModalCancel}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="modal-icon">
              {modalData.type === "email" ? (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="rgba(45, 56, 148, 1)"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              ) : (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="rgba(45, 56, 148, 1)"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              )}
            </div>

            <h3 className="modal-title">
              {modalData.type === "email" ? "Отправить письмо?" : "Позвонить?"}
            </h3>

            <p className="modal-text">
              {modalData.type === "email"
                ? `Вы хотите написать на почту ${modalData.label}?`
                : `Вы точно хотите позвонить по номеру ${modalData.label}?`}
            </p>

            <div className="modal-buttons">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={handleModalCancel}
              >
                Отмена
              </button>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={handleModalConfirm}
              >
                {modalData.type === "email" ? "Написать" : "Позвонить"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------- Плавающая шапка ------------------------------------------------- */}
      <div className="flow-header">
        {/* Логотип (показывается только на мобильных) */}
        <img
          className="flow-header-logo"
          src="./images/logo-denta-leks.png"
          alt="Логотип"
        />

        {/* Контакты */}
        <div className="flow-header-contacts">
          <a
            href="#"
            className="flow-header-text"
            onClick={(e) =>
              handleContactClick(
                e,
                "phone",
                "89258406540",
                "+8 (925) 840-65-40",
              )
            }
          >
            <svg
              className="contact-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="contact-label">+8 (925) 840-65-40</span>
          </a>

          <a
            href="#"
            className="flow-header-text"
            onClick={(e) =>
              handleContactClick(
                e,
                "phone",
                "84992001872",
                "+8 (499) 200-18-72",
              )
            }
          >
            <svg
              className="contact-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="contact-label">+8 (499) 200-18-72</span>
          </a>

          <a
            href="#"
            className="flow-header-text"
            onClick={(e) =>
              handleContactClick(
                e,
                "email",
                "ooodentalex@mail.ru",
                "ooodentalex@mail.ru",
              )
            }
          >
            <svg
              className="contact-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="contact-label">ooodentalex@mail.ru</span>
          </a>

          <a
            href="#"
            className="flow-header-text address-link"
            onClick={(e) => handleContactClick(e, "map", "", "")}
          >
            <svg
              className="contact-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="contact-label">
              Москва, Алтуфьевское шоссе, 97
            </span>
          </a>
        </div>

        {/* Бургер-меню (только для мобильных) */}
        <button
          className="burger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Мобильное меню */}
        <div className={`mobile-nav ${isMenuOpen ? "mobile-nav-open" : ""}`}>
          <a
            className="header-nav"
            href="#main"
            onClick={(e) => {
              handleNavClick(e, "main");
              setIsMenuOpen(false);
            }}
          >
            Главная
          </a>
          <a
            className="header-nav"
            href="#services"
            onClick={(e) => {
              handleNavClick(e, "services");
              setIsMenuOpen(false);
            }}
          >
            Услуги
          </a>
          <a
            className="header-nav"
            href="#prices"
            onClick={(e) => {
              handleNavClick(e, "prices");
              setIsMenuOpen(false);
            }}
          >
            Цены
          </a>
          <a
            className="header-nav"
            href="#sales"
            onClick={(e) => {
              handleNavClick(e, "sales");
              setIsMenuOpen(false);
            }}
          >
            Акции
          </a>
          <a
            className="header-nav"
            href="#reviews"
            onClick={(e) => {
              handleNavClick(e, "reviews");
              setIsMenuOpen(false);
            }}
          >
            Отзывы
          </a>
        </div>

        {/* Карта */}
        {showMap && (
          <div className="address-popup">
            <button className="close-map-btn" onClick={closeMap}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c0f0a1e43cd8f41f227b2ce1710a167e061748a1bc124e64056746e759d67b8&amp;source=constructor"
              width="100%"
              height="240"
              title="Карта клиники"
            ></iframe>
          </div>
        )}
      </div>

      {/* ------------------------------------- Шапка ------------------------------------------------- */}
      <header
        className={`header ${isHeaderVisible ? "header-visible" : "header-hidden"} ${isMobile ? "mobile-header" : ""}`}
        onMouseEnter={handleFlowHeaderMouseEnter}
        onMouseLeave={handleFlowHeaderMouseLeave}
      >
        <img
          className="header-logo"
          src="./images/logo-denta-leks.png"
          alt="Логотип"
        />

        {isMobile ? (
          <>
            <button
              className="burger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <div
              className={`mobile-nav ${isMenuOpen ? "mobile-nav-open" : ""}`}
            >
              <a
                className="header-nav"
                href="#main"
                onClick={(e) => {
                  handleNavClick(e, "main");
                  setIsMenuOpen(false);
                }}
              >
                Главная
              </a>
              <a
                className="header-nav"
                href="#services"
                onClick={(e) => {
                  handleNavClick(e, "services");
                  setIsMenuOpen(false);
                }}
              >
                Услуги
              </a>
              <a
                className="header-nav"
                href="#prices"
                onClick={(e) => {
                  handleNavClick(e, "prices");
                  setIsMenuOpen(false);
                }}
              >
                Цены
              </a>
              <a
                className="header-nav"
                href="#sales"
                onClick={(e) => {
                  handleNavClick(e, "sales");
                  setIsMenuOpen(false);
                }}
              >
                Акции
              </a>
              <a
                className="header-nav"
                href="#reviews"
                onClick={(e) => {
                  handleNavClick(e, "reviews");
                  setIsMenuOpen(false);
                }}
              >
                Отзывы
              </a>
              {/*<a
                className="header-nav"
                href="#contacts"
                onClick={(e) => {
                  handleNavClick(e, "contacts");
                  setIsMenuOpen(false);
                }}
              >
                Контакты
              </a>*/}
            </div>
          </>
        ) : (
          <>
            <a
              className="header-nav"
              href="#main"
              onClick={(e) => handleNavClick(e, "main")}
            >
              Главная
            </a>
            <a
              className="header-nav"
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
            >
              Услуги
            </a>
            <a
              className="header-nav"
              href="#prices"
              onClick={(e) => handleNavClick(e, "prices")}
            >
              Цены
            </a>
            <a
              className="header-nav"
              href="#sales"
              onClick={(e) => handleNavClick(e, "sales")}
            >
              Акции
            </a>
            <a
              className="header-nav"
              href="#reviews"
              onClick={(e) => handleNavClick(e, "reviews")}
            >
              Отзывы
            </a>
            {/*<a
              className="header-nav"
              href="#contacts"
              onClick={(e) => handleNavClick(e, "contacts")}
            >
              Контакты
            </a>*/}
          </>
        )}
      </header>

      {/* ------------------------------------- Услуги (ч.1) ------------------------------------------------- */}
      <div className="services-photo-blocks section" id="main">
        <div className="services-photo">
          <div className="services-photo-texts">
            <p>Наши услуги</p>
          </div>

          <div className="services-photo-buttons">
            <div className="buttons-services">
              <button>
                <span className="service-photo-img">
                  Бесплатная консультация
                </span>
              </button>
              <button>
                <span className="service-photo-img">
                  Лечение кариеса и его осложнений
                </span>
              </button>
              <button>
                <span className="service-photo-img">
                  Все виды протезирования
                </span>
              </button>
              <button>
                <span className="service-photo-img">
                  Эстетическая реставрация
                </span>
              </button>
              <button>
                <span className="service-photo-img">Удаление без боли</span>
              </button>
              <button>
                <span className="service-photo-img">Исправление прикуса</span>
              </button>
              <button>
                <span className="service-photo-img">Имплантация</span>
              </button>
            </div>
          </div>
        </div>

        <div className="services-photo">
          <div className="services-photo-texts">
            <p>Наша клиника</p>
          </div>

          <div className="services-photo-descs">
            <div className="descs-services">
              <p>
                Наша клиника - это гарантия качественного, безболезненного
                лечения и всегда отличный результат, который всегда будет
                радовать Вас и Ваших близких очень долгое время.
              </p>
              <p>
                Специалисты нашей клиники по праву считаются одними из лучших
                профессионалов своей отрасли.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------- Услуги (ч.2) ------------------------------------------------- */}
      <div className="services section" id="services">
        <h3 className="services-title">Услуги</h3>
        <h5 className="services-desc">
          Услуги стоматолога — это процедура, без которой не обойтись ни одному
          человеку. Если вам нужна качественная стоматология в Москве, то,
          естественно, необходимо обращаться только к квалифицированным
          докторам, которые обладают большой практикой и способны справиться с
          любым типом заболеваний ротовой полости.
        </h5>
        <div className="services-container">
          {servicesData.map((service) => {
            let mainCounter = 0;

            return (
              <div
                className="service"
                id={service.id}
                key={service.id}
                style={{
                  backgroundImage: service.image
                    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url(${service.image})`
                    : "none",
                }}
              >
                <div className="service__desc">
                  <h3 className="service__header">{service.title}</h3>
                  <ol className="service__list">
                    {service.items.map((item, index) => {
                      // КЕЙС 1: Пункт с подпунктами (объект)
                      if (typeof item === "object" && item.subItems) {
                        mainCounter++;
                        const parentNumber = mainCounter;

                        return (
                          <li
                            key={index}
                            className="service__list-item service__list-item--parent"
                          >
                            <span className="service__number">
                              {parentNumber}.{" "}
                            </span>
                            <span className="service__item-text">
                              {item.title}
                            </span>
                            <ol className="service__sublist">
                              {item.subItems.map((subItem, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="service__list-item service__list-item--child"
                                >
                                  {subItem}
                                </li>
                              ))}
                            </ol>
                          </li>
                        );
                      }

                      // КЕЙС 2: Обычный пункт (строка)
                      mainCounter++;
                      return (
                        <li key={index} className="service__list-item">
                          <span className="service__number">
                            {mainCounter}.{" "}
                          </span>
                          <span className="service__item-text">{item}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
