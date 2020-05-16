import * as $ from "jquery";
import { Layout } from './model/layout';

declare var jQuery:any;
declare var $:any;

export class Helpers {

	static setLoading(loading) {
		let body = $('body');
		if (loading) {
			$('.preloader-backdrop').fadeIn(200);
		} else {
			$('.preloader-backdrop').fadeOut(200);
		}
	}

	static bodyClass(Class) {
		$('body').attr('class', Class);
	}

	static initLayout() {
	    // SIDEBAR ACTIVATE METISMENU
		$(".metismenu").metisMenu();

		// SIDEBAR TOGGLE ACTION
	    $('.js-sidebar-toggler').click(function() {
	        $('body').toggleClass('sidebar-mini');
	    });

	}

	static initPage() {

	    // Activate Tooltips
	    $('[data-toggle="tooltip"]').tooltip();

	    // Activate Popovers
	    $('[data-toggle="popover"]').popover();

	    // Activate slimscroll
	    $('.scroller').each(function(){
	        $(this).slimScroll({
	            height: $(this).attr('data-height'),
	            color: $(this).attr('data-color'),
	            railOpacity: '0.9',
	        });
	    });

	    $('.slimScrollBar').hide();


		// PANEL ACTIONS
	    // ======================

	    $('.ibox-collapse').click(function(){
	    	var ibox = $(this).closest('div.ibox');
	        ibox.toggleClass('collapsed-mode').children('.ibox-body').slideToggle(200);
	    });
	    $('.ibox-remove').click(function(){
	    	$(this).closest('div.ibox').remove();
	    });
	    $('.fullscreen-link').click(function(){
	        if($('body').hasClass('fullscreen-mode')) {
	            $('body').removeClass('fullscreen-mode');
	            $(this).closest('div.ibox').removeClass('ibox-fullscreen');
	            $(window).off('keydown',toggleFullscreen);
	        } else {
	            $('body').addClass('fullscreen-mode');
	            $(this).closest('div.ibox').addClass('ibox-fullscreen');
	            $(window).on('keydown', toggleFullscreen);
	        }
	    });
	    function toggleFullscreen(e) {
	        // pressing the ESC key - KEY_ESC = 27
	        if(e.which == 27) {
	            $('body').removeClass('fullscreen-mode');
	            $('.ibox-fullscreen').removeClass('ibox-fullscreen');
	            $(window).off('keydown',toggleFullscreen);
	        }
	    }

  }

  static montaTema(layout:Layout){

    console.log(layout);

    this.carregarBarraNavegacaoFixa(layout.barraNavegacaoFixa);
    this.carregarLayoutFixo(layout.layoutFixo);
    this.carregarRecolherBarraLateral(layout.recolherBarraLateral);
    this.carregaCheckBoxCorTema(layout.corTema);
    this.carregaConfig(layout);
  }

  static carregaConfig(layout:Layout){

    if(layout.barraNavegacaoFixa || layout.layoutFixo)
      $('.theme-config').addClass('theme-config-fixed');
    else $('.theme-config').removeClass('theme-config-fixed');
  }

  static carregarBarraNavegacaoFixa(value:boolean) {
    if (value) {
      jQuery(document).ready(function ($) {
        $('body').addClass('fixed-navbar');
      });
    }else{
      jQuery(document).ready(function ($) {
        $('body').removeClass('fixed-navbar');
      });
    }
  }

  static carregarLayoutFixo(value:boolean) {

    if (!value) {
      jQuery(document).ready(function ($) {
        $('body').removeClass('fixed-layout');
      });
    } else {
      jQuery(document).ready(function ($) {
        $('body').addClass('fixed-layout');
      });
    }
  }

  static carregarRecolherBarraLateral(value:boolean) {

    if (value) {
      jQuery(document).ready(function ($) {
        $('body').addClass('sidebar-mini');
      });
    } else {
      jQuery(document).ready(function ($) {
        $('body').removeClass('sidebar-mini');
      });
    }
  }

  static carregaCheckBoxCorTema(cor:string) {

    $("#cor-tema-standard").removeClass('opacity');
    $("#cor-tema-blue").removeClass('opacity');
    $("#cor-tema-green").removeClass('opacity');
    $("#cor-tema-purple").removeClass('opacity');
    $("#cor-tema-orange").removeClass('opacity');
    $("#cor-tema-pink").removeClass('opacity');
    $("#cor-tema-white").removeClass('opacity');
    $("#cor-tema-blue_light").removeClass('opacity');
    $("#cor-tema-green_light").removeClass('opacity');
    $("#cor-tema-purple_light").removeClass('opacity');
    $("#cor-tema-orange_light").removeClass('opacity');
    $("#cor-tema-pink_light").removeClass('opacity');

    $("#cor-tema-" + cor).addClass('opacity');

    if(cor == 'white' || cor == 'standard'){
      $('.theme-config-show').addClass('gray');
      $('.theme-config-show').removeClass('white');
    }else{
      $('.theme-config-show').addClass('white');
      $('.theme-config-show').removeClass('gray');
    }

    this.carregaTemaStyle(cor);
  }

  static carregaTemaStyle(value:string) {
    if(value != 'standard')
      if (!$('#theme-style').length) {
        $('head').append("<link href='assets/css/themes/" + value + ".css' rel='stylesheet' id='theme-style' >");
      } else $('#theme-style').attr('href', 'assets/css/themes/' + value + '.css');
  }

}
