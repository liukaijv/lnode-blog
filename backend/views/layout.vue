<template>
<div class="wrapper">
    <div class="main-header">
        <a class="logo" v-link="{name:'dashboard'}">
            <span class="logo-mini">Blog</span>
            <span class="logo-lg"><b>Lnode</b>blog</span></a>
        <nav class="navbar navbar-static-top">
            <a role="button" id="offcanvas" class="sidebar-toggle">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <ul class="nav navbar-nav">               
                <li>
                    <a v-link="{name:'post_create'}">
                        <i class="fa fa-file-text-o"></i>
                    </a>
                </li>
            </ul>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="user user-menu">
                        <a v-link="{name:'user_edit', params:{user_id: user._id}}">
                            <!-- <img alt="" class="user-image" src="http://lorempixel.com/100/100/?83316"> -->
                            <span class="hidden-xs">{{user.nickname}}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/" target="_blank">
                            <i class="fa fa-home"></i>
                        </a>
                    </li>
                    <li>
                        <a @click="handleLogout">
                            <i class="fa fa-power-off"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

    <sidebar></sidebar>

    <div class="content-wrapper">
    	<router-view></router-view>
    </div>

    <!-- <footer class="main-footer">       
        <strong>Version</strong>1.0.3
    </footer> -->

</div>
</template>

<script>

import { logoutAction, authorizedAction } from '../vuex/actions/auth';
import {showAction as showConfirm, hideAction as hideConfirm} from '../vuex/actions/confirm';
import Sidebar from './partial/sidebar';

export default {	
	ready(){
		this.authorizedAction();		
		document.getElementById('offcanvas').addEventListener('click', function(){
			document.body.classList.toggle('sidebar-collapse')
		}, true)
	},
	vuex: {
		actions: {
			logoutAction,
			authorizedAction,
            showConfirm,
            hideConfirm	
		},
		getters: {
			user: state => state.auth,
			alert: state => state.alert,			
		}
	},
	components:{
		Sidebar
	},
    methods: {
        handleLogout(){
            this.showConfirm('确定要退出吗?', this.confirmOk);
        },
        confirmOk(){
            this.logoutAction();
            this.hideConfirm();            
        }
    }
}

</script>