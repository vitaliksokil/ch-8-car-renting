(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[902],{5787:function(t,r,e){var n=e(7854),a=e(7976),o=n.TypeError;t.exports=function(t,r){if(a(r,t))return t;throw o("Incorrect invocation")}},3678:function(t){t.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},2262:function(t,r,e){"use strict";var n=e(2109),a=e(7908),o=e(6244),i=e(9303),s=e(1223);n({target:"Array",proto:!0},{at:function(t){var r=a(this),e=o(r),n=i(t),s=n>=0?n:e+n;return s<0||s>=e?void 0:r[s]}}),s("at")},4506:function(t,r,e){"use strict";var n=e(2109),a=e(1702),o=e(4488),i=e(9303),s=e(1340),c=e(7293),l=a("".charAt),u=c((function(){return"\ud842"!=="𠮷".at(-2)}));n({target:"String",proto:!0,forced:u},{at:function(t){var r=s(o(this)),e=r.length,n=i(t),a=n>=0?n:e+n;return a<0||a>=e?void 0:l(r,a)}})},2801:function(t,r,e){"use strict";var n=e(2109),a=e(5005),o=e(9114),i=e(3070).f,s=e(2597),c=e(5787),l=e(9587),u=e(6277),d=e(3678),_=e(7741),m=e(1913),w="DOMException",E=a("Error"),f=a(w),h=function(){c(this,R);var t=arguments.length,r=u(t<1?void 0:arguments[0]),e=u(t<2?void 0:arguments[1],"Error"),n=new f(r,e),a=E(r);return a.name=w,i(n,"stack",o(1,_(a.stack,1))),l(n,this,h),n},R=h.prototype=f.prototype,p="stack"in E(w),C="stack"in new f(1,2),g=p&&!C;n({global:!0,forced:m||g},{DOMException:g?h:f});var N=a(w),v=N.prototype;if(v.constructor!==N)for(var I in m||i(v,"constructor",o(1,N)),d)if(s(d,I)){var A=d[I],y=A.s;s(N,y)||i(N,y,o(6,A.c))}},6759:function(t,r,e){"use strict";e.d(r,{D:function(){return o},a:function(){return a}});var n=e(9049);function a(){let t=window.location.search.substring(1);return new URLSearchParams(t)}async function o(t){const r=new n.providers.JsonRpcProvider("https://archival-rpc.testnet.near.org");return await r.txStatus(t,window.nearAccount.accountId)}},8902:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return b}});var n=e(3396),a=e(7139),o=e(9242);const i={class:"site-section p-4"},s={class:"container"},c={class:"p-4 p-md-5 mb-4 text-white rounded bg-dark"},l={class:"row"},u={class:"col-6 px-0 d-flex flex-column justify-content-between"},d={class:"display-4 fst-italic"},_={class:"lead my-3"},m=(0,n._)("hr",null,null,-1),w={class:"d-flex justify-content-between"},E=(0,n._)("span",null,"Owner:",-1),f={class:"d-flex justify-content-between"},h=(0,n._)("span",null,"Price per month:",-1),R=["disabled"],p={class:"col-6"},C=["src"];function g(t,r,e,g,N,v){return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("div",s,[(0,n._)("div",c,[(0,n._)("div",l,[(0,n._)("div",u,[(0,n._)("div",null,[(0,n._)("h1",d,(0,a.zw)(N.currentCar.title),1),(0,n._)("p",_,(0,a.zw)(N.currentCar.description),1)]),(0,n._)("div",null,[m,(0,n._)("p",w,[E,(0,n._)("span",null,(0,a.zw)(N.currentCar.owner_id),1)]),(0,n._)("p",f,[h,(0,n._)("span",null,(0,a.zw)(t.$filters.formatYoctoNearToNear(N.currentCar.price_per_month))+" Ⓝ",1)]),(0,n._)("button",{class:"btn btn-primary w-100",onClick:r[0]||(r[0]=(0,o.iM)(((...t)=>v.startRentCarProcess&&v.startRentCarProcess(...t)),["prevent"])),disabled:N.currentCar.is_rented||N.currentCar.owner_id===t.window.nearAccount.accountId},"Rent car",8,R)])]),(0,n._)("div",p,[(0,n._)("img",{src:N.currentCar.image,alt:"Image",class:"img-fluid",style:{width:"100%"}},null,8,C)])])])])])}e(2801),e(2262),e(4506);var N=e(5648),v=e.n(N),I=e(9049),A=e(6759),y=e(5361)["Buffer"];const S=v()(3).times(10**13).toFixed();var T={name:"SingleCarComponent",components:{},data(){return{currentCar:{}}},methods:{async getCurrentCar(){const t=new I.providers.JsonRpcProvider(window.nearConfig.nodeUrl),r=window.btoa(JSON.stringify({id:+this.$route.params.id})),e=await t.query({request_type:"call_function",finality:"final",account_id:window.nearConfig.contractName,method_name:"get_car_by_id",args_base64:r}).catch((()=>{this.$router.push({name:"home"})}));this.currentCar=JSON.parse(y.from(e.result).toString())},async startRentCarProcess(){let t=this.$loading.show();window.walletConnection.account().functionCall({contractId:window.roketoWrapContractName,methodName:"near_deposit",args:{},gas:"200000000000000",attachedDeposit:v()(((this.currentCar.price_per_month+.2*10**24)/10**24).toFixed(5)).times(10**24).toFixed()}).then((t=>{console.log(t)})),t.hide()},async afterNearDeposit(){let t=this.$loading.show();const r=new I.Contract(window.walletConnection.account(),window.roketoWrapContractName,{changeMethods:["ft_transfer_call"]});await r.ft_transfer_call({receiver_id:window.roketoContractName,amount:v()(this.currentCar.price_per_month/10**24).times(10**24).toFixed(),memo:"Car rent #"+ +this.$route.params.id,msg:JSON.stringify({Create:{request:{owner_id:window.nearAccount.accountId,receiver_id:this.currentCar.owner_id,tokens_per_sec:this.currentCar.price_per_month/60/60/24/30,is_auto_start_enabled:!0}}})},2e14,1),t.hide()},cleanGetParams(){window.history.pushState({},document.title,"https://vitaliksokil.github.io/ch-8-car-renting/#/ch-8-car-renting#"+this.$route.fullPath)},async afterFtTransferCall(){const t=new I.providers.JsonRpcProvider(window.nearConfig.nodeUrl),r=window.btoa(JSON.stringify({account_id:window.nearAccount.accountId,from:1,limit:100})),e=await t.query({request_type:"call_function",finality:"final",account_id:window.roketoContractName,method_name:"get_account_outgoing_streams",args_base64:r});let n=JSON.parse(y.from(e.result).toString());console.log(n);let a=n.at(-1);try{await window.walletConnection.account().functionCall({contractId:window.nearConfig.contractName,methodName:"rent_car",args:{car_id:+this.$route.params.id,stream_id:a.id},gas:S}).then((async()=>{this.$swal.fire({icon:"success",title:"Success",text:"Car was rent!",footer:""}),this.currentCar.is_rented=!0}))}catch(o){this.$swal.fire({icon:"error",title:"Error",text:o.message,footer:""}),console.log(o)}},async continueRentCarProcess(){let t=(0,A.a)(),r=t.get("transactionHashes");if(null!==r){let t=await(0,A.D)(r);if("SuccessValue"in t.status){const r=t.transaction.actions[0].FunctionCall.method_name;switch(r){case"near_deposit":await this.afterNearDeposit(),this.cleanGetParams();break;case"ft_transfer_call":await this.afterFtTransferCall(),this.cleanGetParams();break;case"get_account_outgoing_streams":this.$swal.fire({icon:"success",title:"Success",text:"Car was rent!",footer:""}),this.cleanGetParams();break}}}}},async mounted(){let t=this.$loading.show();await this.getCurrentCar(),await this.continueRentCarProcess(),t.hide()}},D=e(89);const O=(0,D.Z)(T,[["render",g]]);var b=O}}]);
//# sourceMappingURL=902.0fc0613e.js.map