#include <bits/stdc++.h>
using namespace std;

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while (t--) {
		int n; cin >> n;

		long long ans = 0;
		map<int, int> cnt;
		for (int i = 0, a; i < n; i++) {
			cin >> a;
			int A = a - i, B = a - i;
			ans += cnt[B];
			cnt[A]++;
		} cout << ans << '\n';
	}
}