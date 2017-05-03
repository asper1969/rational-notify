<?php

function rational_preprocess_page(&$vars, $hook) {

  foreach($vars['user']->roles as $role){

    if($role == 'operator'){
      drupal_add_js(drupal_get_path('theme', 'rational') . '/js/orders.js');
    }
  }  
}