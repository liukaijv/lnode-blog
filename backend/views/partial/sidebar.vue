<template>
	<aside class="main-sidebar">
	    <section class="sidebar">
	        <ul class="sidebar-menu" v-menu>
	            <li>
	                <a v-link="{name:'dashboard'}">
	                    <i class="fa fa-dashboard"></i>                   
	                    <span>首页</span>
	                </a>
	            </li>
	            <li class="treeview">
	                <a href="#">
	                    <i class="fa fa-sitemap"></i>
	                    <span>分类</span>
	                    <i class="fa fa-angle-left pull-right"></i>
	                </a>
	                <ul class="treeview-menu">
	                    <li>
	                        <a v-link="{name:'category_index'}">
	                            <i class="fa fa-circle-o"></i>
	                          分类列表
	                        </a>
	                    </li>
	                    <li>
	                        <a v-link="{name:'category_create'}">
	                            <i class="fa fa-circle-o"></i>
	                           分类新增
							</a>
						</li>
	                </ul>
	            </li>
	            <li class="treeview">
	                <a href="#">
	                    <i class="fa fa-tags"></i>
	                    <span>标签</span>
	                    <i class="fa fa-angle-left pull-right"></i>
	                </a>
	                <ul class="treeview-menu">
	                    <li>
	                        <a v-link="{name:'tag_index'}">
	                            <i class="fa fa-circle-o"></i>
	                          标签列表
	                        </a>
	                    </li>
	                    <li>
	                        <a v-link="{name:'tag_create'}">
	                            <i class="fa fa-circle-o"></i>
	                           标签新增
							</a>
						</li>
	                </ul>
	            </li> 
	            <li class="treeview">
	                <a href="#">
	                    <i class="fa fa-file"></i>
	                    <span>文章</span>
	                    <i class="fa fa-angle-left pull-right"></i>
	                </a>
	                <ul class="treeview-menu">
	                    <li>
	                        <a v-link="{name:'post_index'}">
	                            <i class="fa fa-circle-o"></i>
	                          文章列表
	                        </a>
	                    </li>
	                    <li>
	                        <a v-link="{name:'post_create'}">
	                            <i class="fa fa-circle-o"></i>
	                           文章新增
							</a>
						</li>
	                </ul>
	            </li>	                            
	        </ul>
	    </section>
	</aside>	
</template>

<script>

import Menu from '../../directives/collapseMenu';
	export default {
		directives:{
			menu:Menu
		}
	}
</script>