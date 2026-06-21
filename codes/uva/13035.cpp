#include <bits/stdc++.h>
using namespace std;
#define ll long long

const ll mod = 1000000007;

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t, tc = 1; cin >> t; while (t--) {
		ll n; cin >> n;
		ll a = n, b = n + 1, c = n + 2;
		if (a % 3 == 0) a /= 3;
		else if (b % 3 == 0) b /= 3;
		else c /= 3;
		ll ans = a % mod * (b % mod) % mod * (c % mod) % mod;
		cout << "Case " << tc++ << ": " << ans << '\n';
	}
}
