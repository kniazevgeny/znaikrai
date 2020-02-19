<template lang="pug">
	nav(style="background-color: transparent")
		v-app-bar(flat app)
			// Title//span {{$t('title')}}
			v-row(style="width: 50%" justify="space-between")
				v-btn(tile text ) КАРТА
				v-btn(tile text ) АНАЛИТИКА
				v-btn(tile text ) ИСТОРИИ
				v-btn(tile text ) О ПРОЕКТЕ
			v-spacer
			// Dark mode
			//<v-btn(text icon color='grey' @click='toggleMode')>//<v-icon(small) brightness_2>
			// Language picker//v-row(justify='center')
			v-dialog(v-model='dialog', persistent='', max-width='1250px', scrollable)
				template(v-slot:activator='{ on }')
					v-btn(tile outlined style="margin-right: 4%" v-on='on') СООБЩИТЬ О НАРУШЕНИИ
				v-card
					v-card-title
						span.headline СООБЩИТЬ О НАРУШЕНИИ
					v-card-text
						v-container
							v-row
								v-col(cols='12')
									v-text-field(label='Какой Ваш статус?*', v-model='b_status', required, hint='Обязательное поле', persistent-hint)
								v-col(cols='12')
									v-text-field(label='В каком регионе находится учреждение ФСИН о котором Вы рассказали?*', v-model='b_region', required, hint='Обязательное поле', persistent-hint)
								v-col(cols='12')
									v-text-field(label='О каком учреждении ФСИН Вы рассказали?*', v-model='b_fsin_organization', required, hint='Обязательное поле', persistent-hint)
								v-col(cols='12')
									v-text-field(label='Укажите когда произошли нарушения о которых Вы рассказали?', v-model='b_time_of_offence')
								v-col(cols='12')
									v-text-field(label='С какими фактами применения физического воздействия со стороны сотрудников ФСИН Вам приходилось сталкиваться?', v-model='b_physical_impact_from_employees')
								v-col(cols='12')
									v-text-field(label='С какими фактами применения физического воздействия со стороны заключенных Вам приходилось сталкиваться?', v-model='b_physical_impact_from_prisoners')
								v-col(cols='12')
									v-text-field(label='С какими фактами психологического воздействия со стороны сотрудников ФСИН Вам приходилось сталкиваться?', v-model='b_psychological_impact_from_employees')
								v-col(cols='12')
									v-text-field(label='С какими фактами психологического воздействия со стороны заключенных Вам приходилось сталкиваться?', v-model='b_psychological_impact_from_prisoners')
								v-col(cols='12')
									v-text-field(label='В каких случаях Вы сталкивались с фактами вымогательства со стороны сотрудников ФСИН?', v-model='b_extortions_from_employees')
								v-col(cols='12')
									v-text-field(label='Приходилось ли Вам сталкиваться с иными случаями коррупции сотрудников ФСИН?', v-model='b_сorruption_from_employees')
								v-col(cols='12')
									v-text-field(label='Приходилось ли Вам сталкиваться с фактами вымогательства со стороны заключенных?', v-model='b_extortions_from_prisoners')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с оказанием медицинской помощи, Вы можете отметить?', v-model='b_violations_of_medical_care')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с питанием, Вы можете отметить?', v-model='b_violations_of_food')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с одеждой, Вы можете отметить?', v-model='b_violations_of_clothes')
								v-col(cols='12')
									v-text-field(label='Известны ли Вам случаи трудового рабства?', v-model='b_labor_slavery')
								v-col(cols='12')
									v-text-field(label='Укажите, в каком диапазоне находится месячная зарплата заключенных?', v-model='b_salary_of_prisoners')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с предоставлением свиданий с Родственниками, Вам известны?', v-model='b_visits_with_relatives')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с общением с адвокатом (иным лицом, имеющим право на оказание юридической помощи), Вам известны?', v-model='b_communication_with_lawyer')
								v-col(cols='12')
									v-text-field(label='Есть ли у заключенных возможность направлять жалобы, ходатайства и заявления в надзирающие органы и правозащитные организации?', v-model='b_can_prisoners_submit_complaints')
								v-col(cols='12')
									v-text-field(label='Если ли у Вас есть дополнительная информация, которой Вы готовы поделиться с нами, то ее можно написать здесь:', v-model='b_additional_information')
								v-col(cols='12')
									v-text-field(label='Согласны ли Вы на публичную огласку приведенных Вами фактов?', v-model='b_public_disclosure')
								v-col(cols='12')
									v-text-field(label='Готовы ли Вы сообщить свое имя и контакты?', v-model='b_provide_name_and_contacts')
								v-col(cols='12')
									v-text-field(label='Согласны ли Вы на обработку Ваших персональных данных?', v-model='b_processing_personal_data')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с этапированием заключенных Вам известны?', v-model='b_violations_staging')
								v-col(cols='12')
									v-text-field(label='С какими запретами (нарушениями) на отправление религиозных обрядов со стороны сотрудников ФСИН Вам приходилось сталкиваться?', v-model='b_violations_religious_rites_from_employees')
								v-col(cols='12')
									v-text-field(label='С какими запретами (нарушениями) на отправление религиозных обрядов со стороны заключенных Вам приходилось сталкиваться?', v-model='b_violations_religious_rites_from_prisoners')
								v-col(cols='12')
									v-text-field(label='С какими нарушениями при применении мер взыскания, связанных с водворением в карцер и ШИЗО, переводом в ПКТ, ЕПКТ и на СУС, Вам приходилось сталкиваться?', v-model='b_violations_penalties_related_to_placement')
								v-col(cols='12')
									v-text-field(label='Мы могли бы помочь Вам в составлении жалобы в Европейский суд по поводу нарушений в местах лишения свободы. Хотели бы Вы получить такую помощь?', v-model='b_help_european_court')
								v-col(cols='12')
									v-text-field(label='Какие нарушения, связанные с иными формами общения с Родственниками, Вам известны?', v-model='b_communication_with_relatives')

							small *indicates required field
						v-card-actions
							v-spacer
							v-btn(color='error', @click='closeWin()') Закрыть
							v-btn(color='success', @click='sendNewBlank()', tile, light) Отправить

					//v-menu(offset-y)
						 template(v-slot:activator='{ on }')
							  v-btn(text icon color='grey' v-on='on') {{currentLocale.icon}}
						 v-list
							  v-list-item(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")
									v-list-item-title {{locale.icon}}
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import * as store from "../plugins/store";
    import {i18n} from "../plugins/i18n";
    import axios from "axios";
    import * as api from "../utils/api";

	 @Component
    export default class Navbar extends Vue {

        dialog: boolean = false
        b_status: string = ''
        b_region: string = ''
        b_fsin_organization: string = ''
        b_time_of_offence: string = ''
        b_physical_impact_from_employees: string = ''
        b_physical_impact_from_prisoners: string = ''
        b_psychological_impact_from_employees: string = ''
        b_psychological_impact_from_prisoners: string = ''
        b_extortions_from_employees: string = ''
        b_сorruption_from_employees: string = ''
        b_extortions_from_prisoners: string = ''
        b_violations_of_medical_care: string = ''
        b_violations_of_food: string = ''
        b_violations_of_clothes: string = ''
        b_labor_slavery: string = ''
        b_salary_of_prisoners: string = ''
        b_visits_with_relatives: string = ''
        b_communication_with_lawyer: string = ''
        b_can_prisoners_submit_complaints: string = ''
        b_additional_information: string = ''
        b_public_disclosure: string = ''
        b_provide_name_and_contacts: string = ''
        b_processing_personal_data: string = ''
        b_violations_staging: string = ''
        b_violations_religious_rites_from_employees: string = ''
        b_violations_religious_rites_from_prisoners: string = ''
        b_violations_penalties_related_to_placement: string = ''
        b_help_european_court: string = ''
        b_communication_with_relatives: string = ''

        get locales() {
            return [{icon: "🇺🇸", code: "en"}, {icon: "🇷🇺", code: "ru"}];
        }

        get currentLocale() {
            for (const locale of this.locales) {
                if (locale.code === i18n.locale) {
                    return locale;
                }
            }
        }

        toggleMode() {
            store.setDark(!store.dark());
            (this.$vuetify.theme as any).dark = store.dark();
        }

        changeLanguage(locale: string) {
            i18n.locale = locale;
            store.setLanguage(locale);
            document.title = i18n.t("Zekovnet") as string;
        }

        closeWin() {
            this.dialog = false;

        }

        sendNewBlank() {
            if (this.b_status != '' && this.b_region != '' && this.b_fsin_organization != '') {
                this.dialog = false;
                axios.post(store.apibase() + "/form",
                    {
                        status: this.b_status,
                        region: this.b_region,
                        fsin_organization: this.b_fsin_organization,
                        time_of_offence: this.b_time_of_offence,
                        physical_impact_from_employees: this.b_physical_impact_from_employees,
                        physical_impact_from_prisoners: this.b_physical_impact_from_prisoners,
                        psychological_impact_from_employees: this.b_psychological_impact_from_employees,
                        psychological_impact_from_prisoners: this.b_psychological_impact_from_prisoners,
                        extortions_from_employees: this.b_extortions_from_employees,
                        сorruption_from_employees: this.b_сorruption_from_employees,
                        extortions_from_prisoners: this.b_extortions_from_prisoners,
                        violations_of_medical_care: this.b_violations_of_medical_care,
                        violations_of_food: this.b_violations_of_food,
                        violations_of_clothes: this.b_violations_of_clothes,
                        labor_slavery: this.b_labor_slavery,
                        salary_of_prisoners: this.b_salary_of_prisoners,
                        visits_with_relatives: this.b_visits_with_relatives,
                        communication_with_lawyer: this.b_communication_with_lawyer,
                        can_prisoners_submit_complaints: this.b_can_prisoners_submit_complaints,
                        additional_information: this.b_additional_information,
                        public_disclosure: this.b_public_disclosure,
                        provide_name_and_contacts: this.b_provide_name_and_contacts,
                        processing_personal_data: this.b_processing_personal_data,
                        violations_staging: this.b_violations_staging,
                        violations_religious_rites_from_employees: this.b_violations_religious_rites_from_employees,
                        violations_religious_rites_from_prisoners: this.b_violations_religious_rites_from_prisoners,
                        violations_penalties_related_to_placement: this.b_violations_penalties_related_to_placement,
                        help_european_court: this.b_help_european_court,
                        communication_with_relatives: this.b_communication_with_relatives
                    }
                ).then(response => {
                    console.log(response);
                    if (response.data.message == "ok") {
                        store.setSnackbar({
                            message: "Успех! Ваша заявка теперь находится в обработке.",
                            color: "success",
                            active: true
                        });
                    }
                })
                    .catch(err => {
                        store.setSnackbar({
                            message: err.message,
                            color: "error",
                            active: true
                        });
                    })
            } else {
                store.setSnackbar({
                    message: "Вы заполнили не все обязательные поля",
                    color: "error",
                    active: true
                });
            }
        }
    }
</script>

<style>
	nav a:link {
		text-decoration: none;
	}

	nav a:visited {
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}

	nav a:active {
		text-decoration: underline;
	}

	header {
		background-color: transparent;
	}
</style>

