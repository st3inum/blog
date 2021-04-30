// #include <bits/stdc++.h>
// using namespace std;

// #define ll long long
// #define lll __int128
// #define endl '\n'

// ll sumsq(ll to) { return to / 2 * ((to - 1) | 1); }
// ll divsum(ll to, ll c, ll k, ll m) {
// 	ll res = k / m * sumsq(to) + c / m * to;
// 	k %= m; c %= m;
// 	if (!k) return res;
// 	ll to2 = (to * k + c) / m;
// 	return res + (to - 1) * to2 - divsum(to2, m - 1 - c, m, k);
// }
// ll modsum(ll to, ll c, ll k, ll m) {
// 	c = ((c % m) + m) % m;
// 	k = ((k % m) + m) % m;
// 	return to * c + k * sumsq(to) - m * divsum(to, c, k, m);
// }
// ll arithmetic(ll to , ll c, ll k, ll m) {
// 	return (ll)(((lll)to * (2 * c + (to - 1) * k)) / (2 * m));
// }
// // ceil(x/y) for integer x,y y>0
// inline ll ceil(ll x, ll y) {
// 	return y > 0 ? (x + y - 1) / y : x / y;
// }
// // floor(x/y) for integer x,y y>0
// inline ll floor(ll x, ll y) {
// 	return y > 0 ? x / y : (x + y - 1) / y;
// }
// int32_t main() {
// 	ios_base::sync_with_stdio(0); cin.tie(0);
// 	int t, tc = 1; cin >> t; while (t--) {
// 		ll p, q, l, cnt = 0; cin >> p >> q >> l;
// 		ll k = 9 * 9 * 9 / q; p *= k;
// 		if ((9 * 9 * 9) % q == 0) {
// 			function<int(int)> l1 = [&](int i){
// 				return ceil(4*(p-81*i),9);
// 			};
// 			function<int(int)> l2 = [&](int i){
// 				return ceil(5*(p-81*i)-l,11);
// 			};
// 			function<int(int)> r1 = [&](int i){
// 				return floor(4*(p-81*i)+l,9);
// 			};
// 			function<int(int)> r2 = [&](int i){
// 				return floor(5*(p-81*i),11);
// 			};
			
// 			// for (ll c = 0, cc = 0, r; cc <= l && (r = p - c) >= 0; c += 81, cc++) {
// 			// 	ll x = max(ceil(4 * r, 9), ceil(5 * r - l, 11));
// 			// 	ll y = min(floor(l + 4 * r, 9), floor(5 * r, 11));
// 			// 	cnt += max(y - x + 1, 0LL);
// 			// 	cout<<cc<<' '<<r<<' '<<max(y - x + 1, 0LL)<<endl;
// 			// }
// 		} cout << "Case " << tc++ << ": " << cnt << endl;
// 	} return 0;
// }