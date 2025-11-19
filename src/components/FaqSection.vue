<template>
  <section id="faq" class="section">
    <div class="section-inner">
      <h2 class="section-title">FAQ</h2>
      <p class="section-subtitle">
        Відповіді на найпопулярніші запитання перед стартом роботи.
      </p>

      <Accordion :multiple="true">
        <AccordionTab header="Чи є безкоштовний період?">
          <p style="font-size:0.9rem;">
            Так, ви отримуєте 14 днів безкоштовного доступу до всього функціоналу.
            Без привʼязки картки. Після цього обираєте план або експортуєте дані.
          </p>
        </AccordionTab>

        <AccordionTab header="Чим відрізняються плани Basic, Team та Pro?">
          <p style="font-size:0.9rem;">
            Basic — для індивідуальних користувачів, Team — для невеликих команд до 20 людей,
            Pro — для компаній із розширеною аналітикою, SSO та виділеною підтримкою.
          </p>
        </AccordionTab>

        <AccordionTab header="Як відбувається оплата?">
          <p style="font-size:0.9rem;">
            Оплата можлива щомісячно або щорічно. Підтримуємо банківські картки та рахунки
            для юросіб.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  </section>
</template>
