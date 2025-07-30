#include<bits/stdc++.h>
using namespace std;
#define ll long long
// ceil(x/y) for integer x,y y>0
inline ll ceil(ll x, ll y) {
	return y > 0 ? (x + y - 1) / y : x / y;
}
// floor(x/y) for integer x,y y>0
inline ll floor(ll x, ll y) {
	return y > 0 ? x / y : (x + y - 1) / y;
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t, tc = 1; cin >> t; while (t--) {
		ll p, q, l, cnt = 0; cin >> p >> q >> l;
		ll k = 9 * 9 * 9 / q; p *= k;
		if ((9 * 9 * 9) % q == 0) {
			for (ll c = 0, cc = 0, r; cc <= l && (r = p - c) >= 0; c += 81, cc++) {
				ll x = max(ceil(4 * r, 9), ceil(5 * r - l, 11));
				ll y = min(floor(l + 4 * r, 9), floor(5 * r, 11));
				cnt += max(y - x + 1, 0LL);
				cout<<cc<<' '<<r<<' '<<max(y - x + 1, 0LL)<<endl;
			}
		} cout << "Case " << tc++ << ": " << cnt << endl;
	} return 0;
}