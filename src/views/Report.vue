<template>
    <div id='report'>
        <form 
            method="POST"
            data-netlify="true"
            name="report"
            data-netlify-honeypot="bot-field"
            @submit.prevent="handleFormSubmission"
        >
            <h2>Enter Product Details</h2>

            <input type="hidden" name="form-name" value="report" />

            <label for="pname">
                Name of Product You Want to Report (If applicable): 
                <input 
                    id="pname" 
                    type="text" 
                    name="pname" 
                    placeholder="Product Name"
                    v-model="form.pname"
                >
            </label>    
			
			<label for="message">
                <abbr title="Required" aria-label="Required">*</abbr>    
                Message: 
                <textarea 
                    id="message" 
                    name="message" 
                    required
                    v-model="form.message"
                    placeholder="In detail, describe your issue with either the webiste or a product..."
                ></textarea>
            </label>
			
            <div>
                <app-button type="submit" :label="'Send Report'">
                    Report
                    <app-send-icon></app-send-icon>
                </app-button>
            </div>
        </form>

        <p>
            If you need to <mark class="highlight">report</mark> something, you can do so on this page.
            If the product is already in the <router-link to="/excluded">excluded list <app-link-icon></app-link-icon></router-link> or <router-link to="/watchlist">watchlist <app-link-icon></app-link-icon></router-link>, and you think should be added to the main list, please list out your reason.
            <br><br>
            Use this page to report:
            <ul>
                <li>Bugs</li>
                <li>Broken links</li>
                <li>Inaccurate info about a product</li>
                <li>A misplaced service (one doesn't belong in its respective list or here at all)</li>
                <li>Just about anything else</li>
            </ul>
        </p> 
    </div>
</template>


<script>
import Button from "@/components/Button.vue";
import LinkIcon from "@/components/icons/LinkIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";

import { encode } from '@/scripts/helpers';

export default {
    name: 'Report',
    components: {
        appButton: Button,
        appLinkIcon: LinkIcon,
        appSendIcon: SendIcon,
    },
    metaInfo: {
        title: 'Report',
        meta: [
            { vmid: 'title', name: 'title', template: '%s | EncryptedList', content: 'Report'},
            
			{ vmid: 'og:title', property: 'og:title', template: '%s | EncryptedList', content: 'Report'},
            { vmid: 'og:url', property: 'og:url', content: 'https://encryptedlist.xyz/report/'},
            
			{ vmid: 'twitter:title', name: 'twitter:title', template: '%s | EncryptedList', content: 'Report' },
			{ vmid: 'twitter:site', name: 'twitter:site', content: 'https://encryptedlist.xyz/report/' },
        ],
        link: [
			{ rel: 'canonical', href: 'https://encryptedlist.xyz/report/'}
		]
    },
    data() {
        return {
            form: {
                pname: '',
                message: ''
            }
        }
    },
    methods: {
        handleFormSubmission: function() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };

            this.$http.post(
                "/report",
                encode({
                    "form-name": "report",
                    ...this.form
                }),
                axiosConfig
            )
			.then(() => {
                this.$router.push({ name: "FormSuccess", query: { from: "report" } });
			})
			.catch(() => {
                this.$router.push({ name: "FormFailure", query: { from: "report" } });
			});
        },
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#report {
    padding: .5rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

#report > form {
    width: 55%;
    max-width: 640px;
}

#report > form > * {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1rem;
}

#report > form h2 {
    text-align: left;
}

#report > form > label {
    display: block;
}

#report > form button svg {
    margin-left: .5rem;
}

#report > form > label abbr {
    color: var(--primary-red-color);
}

#report > form textarea,
#report > form input[type="text"] {
    width: 100%;
    padding: .5rem .75rem;
    background-color: var(--background-color);
    color: var(--text-color);
    display: block;
    margin: 0.5rem 0;
    font-size: 1rem;
    border: 2.5px solid var(--gray-border-color);
	border-radius: 0.5rem;
    resize: none;
    box-shadow: none;
}

#report > form textarea {
    height: 7rem;
}

#report > form input[type="text"] {
    height: 2.75rem;
}

#report > form button {
    background-color: var(--yellow-black-color);
	border-color:  var(--yellow-black-alt-color);
}

#report > p {
    font-size: 1.1rem;
    width: 40%;
    text-align: left;
    margin: 0;
}

#report > p ul {
    list-style: none;
    text-align: left;
}

#report > p ul li::before {
    content: "\25FC";
    color: var(--primary-yellow-color);
    font-weight: bold;
    display: inline-block;
    width: 1.5em;
    margin-left: -1em;
}

#report a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

.highlight {
    border-radius: .1rem;
    padding: 0 .25rem;
}


@media only screen and (max-width: 840px) {
    #report {
        flex-direction: column-reverse;
        align-items: center;
    }

    #report > form {
        width: 100%;
    }

    #report > p {
        width: 80%;
        margin: 0 0 2rem 0;
    }
}

@media only screen and (max-width: 480px) {
	#report {
        padding: 1rem .25rem;
	}

    #report > p,
    #report > form {
        width: 95%;
    }

    #report > form > * {
        width: 100%;
    }
}
</style>
