#include <iostream>
using namespace std;

#define ll long long

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while (t--) {
		ll n, s = 0; cin >> n;
		for (ll i = 1, j, v; i <= n && (j = n / (v = (n / i))); i = j + 1) {
			// all value x in range [i,j] will have same value floor(n/x) = v
			s += 1LL * (j - i + 1) * v;
		}
		cout << s << '\n';
	}
}